import React, { createContext, useContext, useState } from "react";
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

export const AuthProvider = ({ children }: { children: any }) => {
  const [credentialResponse, setCredentialResponse] =
    useState<CredentialResponse | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const logout = () => {
    localStorage.removeItem("google_token");
    googleLogout();
    setCredentialResponse(null);
    setEmail(null);
  };

  const onCompleteLogin = async (credentialResponse: CredentialResponse) => {
    // Called from the "top-menu" component when the user logs in so we can get the data from the login button component
    if (!credentialResponse.credential) {
      return;
    }
    localStorage.setItem("google_token", JSON.stringify(credentialResponse));
    setCredentialResponse(credentialResponse);
    const { email }: any = jwtDecode(credentialResponse.credential);
    setEmail(email);
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
