import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import api from '@/services/api';
import { LoginData } from '@/types';

interface AuthContextType {
  token: string | null;
  user: any;
  isLoading: boolean;
  login: (arg0: LoginData) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider mounted');
    
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          console.log('Loaded token:', storedToken);
          
          setToken(storedToken);
          // api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          // await checkToken();
        }else{
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Failed to load token', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (data:LoginData) => {
    try {
      console.log(data);
      
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      
      // await AsyncStorage.setItem('token', token);
      // setToken(token);
      // setUser(user);
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await AsyncStorage.setItem('token', 'as_token');
      setToken('as_token');
      setUser(data);
      router.replace('/(protected)');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      await AsyncStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      router.replace('/(protected)');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setUser(null);
      // delete api.defaults.headers.common['Authorization'];
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const checkToken = async () => {
    try {
      const response = await api.get('/auth/user');
      setUser(response.data.user);
    } catch (error) {
      console.error('Token check failed', error);
      await logout();
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, register, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);