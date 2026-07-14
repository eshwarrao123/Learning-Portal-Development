import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export const AuthContext = createContext(null);

const storedUser  = () => JSON.parse(localStorage.getItem('user')  || 'null');
const storedToken = () => localStorage.getItem('token') || null;

export const AuthProvider = ({ children }) => {
  const [user,  setUser]  = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token && user);

  // Persist to localStorage whenever auth state changes
  useEffect(() => {
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user',  JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', credentials);
      setUser({ ...data.data, token: undefined });
      setToken(data.data.token);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', userData);
      setUser({ ...data.data, token: undefined });
      setToken(data.data.token);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
