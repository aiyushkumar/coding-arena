import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, assessmentAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [skillProfile, setSkillProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const token = localStorage.getItem('arena_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await authAPI.getMe();
      if (res.success) {
        setUser(res.user);
        setSkillProfile(res.skillProfile);
      }
    } catch (err) {
      console.warn('Session expired or invalid, logging out:', err.message);
      localStorage.removeItem('arena_token');
      setUser(null);
      setSkillProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.success) {
      localStorage.setItem('arena_token', res.token);
      setUser(res.user);
      // Fetch user's skill profile
      try {
        const profileRes = await assessmentAPI.getProfile();
        if (profileRes.success) {
          setSkillProfile(profileRes.skillProfile);
        }
      } catch (e) {
        // Ignored
      }
      return res.user;
    }
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    if (res.success) {
      localStorage.setItem('arena_token', res.token);
      setUser(res.user);
      try {
        const profileRes = await assessmentAPI.getProfile();
        if (profileRes.success) {
          setSkillProfile(profileRes.skillProfile);
        }
      } catch (e) {
        // Ignored
      }
      return res.user;
    }
  };

  const logout = () => {
    localStorage.removeItem('arena_token');
    setUser(null);
    setSkillProfile(null);
  };

  const refreshUser = async () => {
    await fetchSession();
  };

  const updateSkillProfile = (newProfile) => {
    setSkillProfile(newProfile);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        skillProfile,
        loading,
        login,
        register,
        logout,
        refreshUser,
        updateSkillProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
