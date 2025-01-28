import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "./ApiClient";
import { googleLogout, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string | null;
  logout: () => void;
  onCompleteLogin: (credentialResponse: CredentialResponse) => void;
  credentialResponse: CredentialResponse | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [credentialResponse, setCredentialResponse] =
    useState<CredentialResponse | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const onCompleteLogin = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);

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

  useEffect(() => {
    // const credentialResponse = localStorage.getItem("google_token");
    // if (credentialResponse) {
    //   const response: credentialResponse = JSON.parse(credentialResponse);
    //   setCredentialResponse(response);
    // }
  }, []);

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
