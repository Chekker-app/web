'use client';

import { api } from '@/lib/api';
import { Plan, PlanUsage } from '@prisma/client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type User = {
  name: string;
  email: string;
  plan: Plan;
  weeklyReports: boolean;
  planUsage: PlanUsage;
  shortName: string;
};

interface AuthContextType {
  user: User;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}