
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on app start
    const storedToken = localStorage.getItem('intelliestate_token');
    const storedUser = localStorage.getItem('intelliestate_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - in real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const mockUser = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      setUser(mockUser);
      setToken(mockToken);
      
      // Store in localStorage
      localStorage.setItem('intelliestate_token', mockToken);
      localStorage.setItem('intelliestate_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('intelliestate_token');
    localStorage.removeItem('intelliestate_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
