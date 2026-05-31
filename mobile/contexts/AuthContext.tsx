import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMe, login as authLogin, logout as authLogout, register as authRegister, User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    role: string;
    company_name?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const userData = await authLogin(username, password);
    setUser(userData);
  };

  const register = async (payload: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    role: string;
    company_name?: string;
  }) => {
    const userData = await authRegister(payload);
    setUser(userData);
  };

  const logout = async () => {
    await authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
