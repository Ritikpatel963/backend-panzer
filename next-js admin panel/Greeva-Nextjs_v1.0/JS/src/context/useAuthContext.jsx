'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/apiClient';
import { ENDPOINTS } from '@/lib/apiEndpoints';

const AuthContext = createContext(undefined);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext can only be used within AuthProvider');
  return ctx;
};

const fetchMe = async () => {
  let lastErr;
  for (const candidate of ENDPOINTS.auth.meCandidates) {
    try {
      return await api.get(candidate);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchMe();
      // Support either {data: user} or {user: user} or direct user object.
      const nextUser = res?.data || res?.user || res;
      setUser(nextUser || null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async ({ email, password }) => {
    const res = await api.post(ENDPOINTS.auth.login, { email, password });
    // After login cookie set, fetch /me to get profile.
    await refresh();
    return res;
  };

  const logout = async () => {
    try {
      await api.post(ENDPOINTS.auth.logout, {});
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      refresh
    }),
    [user, isLoading, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

