import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getConfig, setConfig } from "./ApiClient";
import { useAuth } from "./AuthProvider";
interface RemoteConfig {
  [key: string]: string;
  currentASForce: string;
  favoriteASGroups: string;
}

interface RemoteDataContextType {
  lastUpdated: number | null;
  manuallySave: () => Promise<void>;
}

const RemoteDataContext = createContext<RemoteDataContextType | undefined>(
  undefined
);

export const RemoteDataProvider = ({
  children,
  onUpdateConfig,
}: {
  children: any;
  onUpdateConfig: (data: {
    currentASForce: any;
    favoriteASGroups: any;
  }) => void;
}) => {
  const [lastConfig, setLastConfig] = useState<RemoteConfig | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [lastDirty, setLastDirty] = useState<number | null>(null);
  const { credentialResponse } = useAuth();

  const fetchRemoteConfig = useCallback(async () => {
    console.log(1);

    if (!credentialResponse?.credential) {
      return;
    }
    const config = await getConfig(credentialResponse?.credential);

    // Save each config to local storage
    Object.keys(config).forEach((key) => {
      if (config[key]) {
        localStorage.setItem(key, config[key]);
      }
    });

    // If we have a config, update the state of the app
    if (config?.currentASForce || config?.favoriteASGroups) {
      onUpdateConfig({
        currentASForce: JSON.parse(config?.currentASForce || {}),
        favoriteASGroups: JSON.parse(config?.favoriteASGroups || {}),
      });
    }

    setLastConfig(config || {});
    setLastUpdated(Date.now());
  }, [credentialResponse?.credential]);

  const updateRemoteConfigIfDirty = useCallback(async () => {
    // Don't push updates if we haven't fetched remote yet
    console.log(`checking`);
    if (lastConfig == null) {
      return;
    }
    let dirty = false;
    const newConfig: any = { ...lastConfig };

    ["currentASForce", "favoriteASGroups"].forEach((key) => {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== lastConfig?.[key]) {
        dirty = true;
        newConfig[key] = storedValue;
      }
    });
    if (dirty) {
      setLastDirty(Date.now());
      setLastConfig(newConfig);
      console.log("updating", newConfig);
      await setConfig(newConfig, credentialResponse?.credential as string);
      setLastUpdated(Date.now());
    }
  }, [credentialResponse?.credential, lastConfig]);

  useEffect(() => {
    if (credentialResponse?.credential) {
      fetchRemoteConfig();
    } else {
      setLastConfig(null);
    }
  }, [credentialResponse?.credential, fetchRemoteConfig]);

  useEffect(() => {
    if (credentialResponse?.credential && lastConfig) {
      const intervalId = setInterval(() => {
        updateRemoteConfigIfDirty();
      }, 30000); // 30 seconds
      return () => clearInterval(intervalId); // Cleanup interval on unmount or when credentialResponse changes
    }
  }, [credentialResponse?.credential, lastConfig, updateRemoteConfigIfDirty]);

  useEffect(() => {
    if (credentialResponse?.credential && lastConfig) {
      const intervalId = setInterval(() => {
        // TEST THIS

        if (lastDirty || 0 > Date.now() - 360000) {
          console.log(`fetching remote`);
          fetchRemoteConfig();
        }
      }, 360000 * 4); // four hours
      return () => clearInterval(intervalId); // Cleanup interval on unmount or when credentialResponse changes
    }
  }, [
    credentialResponse?.credential,
    lastConfig,
    updateRemoteConfigIfDirty,
    fetchRemoteConfig,
    lastDirty,
  ]);

  return (
    <RemoteDataContext.Provider
      value={{
        lastUpdated,
        manuallySave: updateRemoteConfigIfDirty,
      }}
    >
      {children}
    </RemoteDataContext.Provider>
  );
};

export const useRemoteData = (): RemoteDataContextType => {
  const context = useContext(RemoteDataContext);
  if (!context) {
    throw new Error("useAuth must be used within an RemoteDataProvider");
  }
  return context;
};
