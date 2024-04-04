import React, { useContext, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/nav-logo-Image.svg";
import cart_icon from "../Assets/cart-shopping.svg";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { AuthContext } from "../../Context/auth.context";
import { getCartservice } from "../../Context/cart.services";
import loginIcon from "../Assets/login.svg";
import logoutIcon from "../Assets//logout.svg";

const Navbar = () => {
  let [menu, setMenu] = useState("shop");
  const [cartQuantity, setCartQuantity] = useState(0);
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const { cartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const handleLogout = async () => {
    try {
      // Elimina el token del almacenamiento local
      localStorage.removeItem("authToken");
      // Llama a la función de autenticación con un objeto vacío para cerrar la sesión
      await authenticateUser({});
      // Redirige al usuario a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchCartQuantity = async () => {
      try {
        let newCartQuantity = 0;
        if (isLoggedIn) {
          const response = await getCartservice();
          newCartQuantity = response.quantity;
        }
        setCartQuantity(newCartQuantity);
      } catch (error) {
        console.error("Error fetching cart quantity:", error);
      }
    };

    fetchCartQuantity();
  }, [isLoggedIn, cartItems]);

  return (
    <div className="nav">
      <Link
        to="/"
        onClick={() => {
          setMenu("shop");
        }}
        style={{ textDecoration: "none" }}
        className="nav-logo"
      >
        <img src={logo} alt="Icon" />
        <p>LA.GRIMA</p>
      </Link>
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link to="/t-shirts" style={{ textDecoration: "none" }}>
            T-Shirts
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link to="/hoodies" style={{ textDecoration: "none" }}>
            Hoodies & Sweatshirts
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link to="/misc" style={{ textDecoration: "none" }}>
            Misc
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <img src={logoutIcon} alt="" onClick={handleLogout} />
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <img src={loginIcon} alt="" />
          </Link>
        )}
        {isLoggedIn ? (
          <Link to="/cart">
            <img src={cart_icon} alt="cart" />
          </Link>
        ) : (
          <Link to="/login">
            <img src={cart_icon} alt="cart" />
          </Link>
        )}
        <div className="nav-cart-count">
          {cartQuantity > 0 ? cartQuantity : 0}
        </div>
        <p>total: {cartItems.totalPrice}</p>
      </div>
    </div>
  );
};

export default Navbar;
