import React, { createContext, useEffect, useState, useContext } from "react";
import { getCartservice, addCartService } from "./cart.services";
import { AuthContext } from "./auth.context";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState({ cart: [], totalPrice: 0, quantity: 0 });

  useEffect(() => {
    fetch("http://localhost:5005/products/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("ShopContext Products:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getCartservice()
        .then((response) => {
          if (response && response.cart) {
            console.log("ShopContext Cart Items:", response.cart, response.totalPrice);
            setCartItems(response);
          } else {
            console.log("No cart items found.");
            // Manejar el caso en que no hay ningún artículo en el carrito
            // Por ejemplo:
             setCartItems({ cart: [], totalPrice: 0, quantity: 0 });
          }
        })
        .catch((error) => console.error("Error fetching cart items:", error));
    }
  }, [isLoggedIn]);
  

  const updateCartItems = (updatedCartItems) => {
    setCartItems(updatedCartItems);
    console.log("Updated Cart:", updatedCartItems);
    console.log("Previous Cart:", cartItems);
  };

  const contextValue = {
    products,
    cartItems,
    updateCartItems,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
