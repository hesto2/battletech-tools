import React, { createContext, useContext, useState, useEffect } from "react";
import { getConfig, setConfig } from "./ApiClient";
import { googleLogout, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const CONFIG_KEYS = ["currentASForce", "favoriteASGroups"];

interface AuthContextType {
  isLoggedIn: boolean;
  email: string | null;
  logout: () => void;
  onCompleteLogin: (credentialResponse: CredentialResponse) => void;
  credentialResponse: CredentialResponse | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [credentialResponse, setCredentialResponse] =
    useState<CredentialResponse | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const onCompleteLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      return;
    }
    localStorage.setItem("google_token", JSON.stringify(credentialResponse));
    setCredentialResponse(credentialResponse);
    const { email }: any = jwtDecode(credentialResponse.credential);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("google_token");
    googleLogout();
    setCredentialResponse(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!credentialResponse,
        logout,
        credentialResponse,
        onCompleteLogin,
        email,
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
