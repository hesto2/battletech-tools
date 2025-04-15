import React, { createContext, useContext, useEffect, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { getTokens, getUser, refreshToken, Tokens } from "./ApiClient";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string | null;
  logout: () => void;
  login: () => void;
  onCompleteLogin: (tokens: Tokens) => void;
  tokens: Tokens | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const logout = () => {
    googleLogout();
    setTokens(null);
    setEmail(null);
  };

  const onCompleteLogin = async (tokens: Tokens) => {
    // Called from the "top-menu" component when the user logs in so we can get the data from the login button component
    setTokens(tokens);
    const { email } = await getUser(tokens.access_token);
    setEmail(email);
  };
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const tokens = await getTokens(codeResponse.code);
      await onCompleteLogin(tokens);
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (tokens) {
      localStorage.setItem("tokens", JSON.stringify(tokens));
    }
  }, [tokens]);

  const refreshIfNearExpiry = async (tokens: Tokens) => {
    console.log(
      `checking expiry: ${tokens.expiry_date}, ${
        tokens.expiry_date - Date.now() < 1000 * 60 * 10
      }`
    );
    if (tokens.expiry_date - Date.now() < 1000 * 60 * 10) {
      console.log(`refreshing`);
      try {
        const newTokens = await refreshToken(tokens.refresh_token);
        setTokens(newTokens);
        return newTokens;
      } catch (error) {
        setTokens(null);
        return null;
      }
    } else {
      return tokens;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (tokens) {
        refreshIfNearExpiry(tokens);
      }
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, [tokens]);

  useEffect(() => {
    const storedTokens = localStorage.getItem("tokens");
    if (storedTokens) {
      const tokens = JSON.parse(storedTokens);
      setTokens(tokens);
      const refresh = async () => {
        if (tokens) {
          const newTokens = await refreshIfNearExpiry(tokens);
          if (newTokens) {
            onCompleteLogin(newTokens);
          } else {
            logout();
          }
        }
      };
      refresh();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!tokens,
        logout,
        tokens,
        onCompleteLogin,
        email,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
