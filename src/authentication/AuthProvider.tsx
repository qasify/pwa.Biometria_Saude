import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthUser, UserData } from "../types";

interface AuthContextType {
  authenticatedUser: AuthUser | UserData | null;
  setAuthenticatedUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthUser | null>(
    null
  );

  const handleAuthentication = (user: AuthUser) => {
    setAuthenticatedUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ authenticatedUser, setAuthenticatedUser: handleAuthentication }}
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
