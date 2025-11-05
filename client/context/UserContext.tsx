import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "tourist" | "host" | "guide" | "admin" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinDate?: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole) => {
    setUser({
      id: `user_${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop`,
      joinDate: new Date().toISOString().split("T")[0],
    });
  };

  const signup = (name: string, email: string, _password: string, role: UserRole) => {
    setUser({
      id: `user_${Date.now()}`,
      name,
      email,
      role,
      avatar: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop`,
      joinDate: new Date().toISOString().split("T")[0],
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
