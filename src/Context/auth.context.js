import { createContext, useEffect, useState } from "react";
import { verifyService } from "../Context/auth.services";
import { BounceLoader } from "react-spinners";

const AuthContext = createContext();

function AuthWrapper(props) {
  // 1-1 esta el usuario logueado??
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //1.2 quien es el usuario logueado??
  const [user, setUser] = useState(null);
  // Funcion isloading => la app empieza validando el token
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  // Funcion que invoca el servicio de verify para validar el token
  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      console.log("token chekeado", isLoggedIn, user);
      // Verifica si la respuesta contiene datos de usuario válidos
      if (response && response._id && response.name && response.email) {
        // desde aquí el usuario está logueado
        setIsLoggedIn(true);
        // info del usuario
        setUser(response);
        console.log("response", response);
        console.log("cart", response.cart)
      } else {
        // Si la respuesta no contiene datos de usuario válidos, el usuario no está autenticado
        setIsLoggedIn(false);
        setUser(null);
      }
      // deja de cargar
      setIsLoading(false);
    } catch (error) {
      // En caso de error, el usuario no está autenticado
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  //2* el objeto de contexto que pasaremos
  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
  };

  if (isLoading) {
    return <BounceLoader color="#471971" className="myLoader" />;

    //3* la renderizacion de la app con el contexto pasado
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

//* devemos envolver app en index.js

export { AuthContext, AuthWrapper };
