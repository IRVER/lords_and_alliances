import React, { useState } from "react";
import { AuthService } from "../../services/auth_service";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";


const LoginRegister: React.FC = () => {

  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "" });
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(formData.email, formData.password);
      localStorage.setItem("token", response.token); // Guarda el token en localStorage
      navigate("/game"); // Redirige a la pantalla principal del juego
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleRegister = async () => {
    try {
      const response = await AuthService.register(
        formData.name,
        formData.email,
        formData.password
      );

      // Guarda el token en localStorage y redirige a la pantalla principal del juego
      localStorage.setItem("token", response.token);
      navigate("/game");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        handleRegister();
      } else {
        // Llamar al servicio de login
        handleLogin()
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="title">{isRegister ? "Registrar Cuenta" : "Iniciar Sesión"}</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-group">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isRegister ? "Registrar" : "Entrar"}
          </button>
        </form>
        <p className="toggle-text" onClick={toggleMode}>
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión aquí."
            : "¿No tienes cuenta? Regístrate aquí."}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
