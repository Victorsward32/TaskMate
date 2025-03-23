// Context to manage authentication state
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  saveToken, 
  saveUserData, 
  getToken, 
  getUserData, 
  removeToken, 
  removeUserData 
} from '../utils/tokenStorage';
import { authService } from '../api/apiService';

const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider Component 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // console.log("user from aith context: ",user)

  // Initialize: check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("Checking auth status...");
        const token = await getToken();
        console.log("Found token:", token);
        const userData = await getUserData();
        console.log("Found user data:", userData);
        
        
        if (token && userData) {
          setUser(userData);
          setIsAuthenticated(true);
          console.log("User authenticated!");
        }
      } catch (error) {
        console.error('Auth check failed: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Login Function
  const login = async (username, password) => {
    try {
      // This should match your API's expected parameters
      const response = await authService.login(username, password);
      const { token } = response.data;
      
      // Save token to AsyncStorage
      await saveToken(token);
      
      // Get user data
      const userData = response.data; // Save full user data from response
      await saveUserData(userData);
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration failed:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear token and user data
      await removeToken();
      await removeUserData();
      
      // Update state
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false };
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;