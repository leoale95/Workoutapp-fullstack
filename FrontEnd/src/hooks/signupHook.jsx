import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/user/signup', {
        email,
        password,
      });

      const json = response.data;

      
      if (response.status === 200) {
        
        localStorage.setItem('user', JSON.stringify(json));

        
        dispatch({ type: 'LOGIN', payload: json });
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
