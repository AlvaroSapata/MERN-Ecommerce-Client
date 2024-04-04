import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/auth.context.js"; // Importa el contexto de autenticación
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom
import { loginService } from "../Context/auth.services.js"; // Importa el servicio de inicio de sesión
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const { authenticateUser } = useContext(AuthContext); // Usa el contexto de autenticación
  const navigate = useNavigate(); // Utiliza useNavigate para manejar la navegación
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error
  const [state, setState] = useState("Login");
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Llama al servicio de inicio de sesión para obtener el token de autenticación
      const { authToken, message } = await loginService(credentials);

      if (message) {
        // Si hay un mensaje de error, establece el mensaje de error en el estado
        setErrorMessage(message);
      } else {
        // Si no hay mensaje de error, guarda el token de autenticación en localStorage
        localStorage.setItem("authToken", authToken);
        // Llama a la función authenticateUser para establecer el estado de autenticación en la aplicación
        await authenticateUser();
        setErrorMessage(""); // Limpia el mensaje de error
        // Redirige al usuario a la página principal después de iniciar sesión correctamente
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const signup = async () => {
    let dataObj;
    await fetch("http://localhost:5005/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      window.location.replace("/");
    } else {
      setErrorMessage(dataObj.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h2>{state}</h2>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <div>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Enter your name..."
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <></>
          )}
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email..."
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password..."
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="btn-fixer">
          <button
            onClick={(e) => {
              state === "Login" ? handleLogin(e) : signup();
            }}
          >
            {state}
          </button>
        </div>
        {/* Muestra el mensaje de error si existe */}
        {errorMessage && <small className="error-message">{errorMessage}</small>}
        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
