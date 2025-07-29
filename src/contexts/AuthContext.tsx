import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
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
  const [isLoading, setIsLoading] = useState(true);

  // Simulated users database
  const mockUsers = [
    { id: '1', email: 'demo@teeshack.com', password: '123456', name: 'Usuario Demo' },
    { id: '2', email: 'admin@teeshack.com', password: 'admin123', name: 'Administrador' }
  ];

  useEffect(() => {
    // Check if user is logged in (localStorage simulation)
    const savedUser = localStorage.getItem('teeshack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userProfile = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${foundUser.name}`
      };
      
      setUser(userProfile);
      localStorage.setItem('teeshack_user', JSON.stringify(userProfile));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    
    setUser(newUser);
    localStorage.setItem('teeshack_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('teeshack_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};