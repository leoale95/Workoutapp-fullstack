import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        email,
        password,
      });

      const json = response.data;

      // Verificar si la respuesta fue exitosa
      if (response.status === 200) {
        // Guardar el usuario en el almacenamiento local
        localStorage.setItem('user', JSON.stringify(json));

        // Actualizar el contexto de autenticación
        dispatch({ type: 'LOGIN', payload: json });
      } else {
        setError(json.error);
      }
    } catch (error) {
      setError('Ocurrió un error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
