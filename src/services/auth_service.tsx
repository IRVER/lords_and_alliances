import axios from "axios";

// URL base del backend
const API_URL = "http://localhost:5005/api/auth";

export const AuthService = {
  // Función para login
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data; // Retorna los datos del backend (token, usuario, etc.)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  },

  // Función para registro
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      return response.data; // Retorna los datos del backend (mensaje de éxito, etc.)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al registrarse");
    }
  },
};
