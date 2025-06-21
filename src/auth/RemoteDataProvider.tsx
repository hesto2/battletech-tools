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
  const { tokens } = useAuth();

  const fetchRemoteConfig = useCallback(async () => {
    if (!tokens?.access_token) {
      return;
    }
    const config = await getConfig(tokens?.access_token);

    // Merge remote config into localStorage WITHOUT overwriting existing local changes
    Object.keys(config).forEach((key) => {
      if (!config[key]) {
        return;
      }

      const existing = localStorage.getItem(key);
      if (existing === null) {
        // Only set if there is nothing locally yet so that a locally-loaded configuration is preserved
        localStorage.setItem(key, config[key]);
      }
    });

    // Build an effectiveConfig object from what is currently in localStorage so state reflects local view
    const effectiveConfig: any = {};
    ["currentASForce", "favoriteASGroups"].forEach((k) => {
      const val = localStorage.getItem(k);
      if (val !== null) effectiveConfig[k] = val;
    });

    if (effectiveConfig.currentASForce || effectiveConfig.favoriteASGroups) {
      onUpdateConfig({
        currentASForce: JSON.parse(effectiveConfig.currentASForce || "{}"),
        favoriteASGroups: JSON.parse(effectiveConfig.favoriteASGroups || "[]"),
      });
    }

    // Use the effective config (local) as lastConfig baseline to avoid false dirty detection
    setLastConfig(effectiveConfig);
    setLastUpdated(Date.now());
  }, [tokens?.access_token]);

  const updateRemoteConfigIfDirty = useCallback(async () => {
    // Don't push updates if we haven't fetched remote yet
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
      await setConfig(newConfig, tokens?.access_token as string);
      setLastUpdated(Date.now());
    }
  }, [tokens?.access_token, lastConfig]);

  useEffect(() => {
    if (tokens?.access_token) {
      fetchRemoteConfig();
    } else {
      setLastConfig(null);
    }
  }, [tokens?.access_token, fetchRemoteConfig]);

  // Removed auto-save interval; saving is now triggered manually via UI

  useEffect(() => {
    if (tokens?.access_token && lastConfig) {
      const intervalId = setInterval(() => {
        // TEST THIS

        if (lastDirty || 0 > Date.now() - 1000 * 60 * 5) {
          console.log(`fetching remote`);
          fetchRemoteConfig();
        }
      }, 1000 * 60 * 5);
      return () => clearInterval(intervalId); // Cleanup interval on unmount or when tokens changes
    }
  }, [
    tokens?.access_token,
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
