import React, { createContext, useEffect, useState, useContext } from "react";
import { getCartservice, addCartService, getTotalCartService, pullCartService, deleteCartService } from "./cart.services";
import { AuthContext } from "./auth.context";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState({ cart: [], totalPrice: 0, quantity: 0 });

  useEffect(() => {
    // Gets all products
    fetch("http://localhost:5005/products/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("ShopContext Products:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    // Update cart items when user logs in
    if (isLoggedIn) {
      getCartservice()
        .then((response) => {
          console.log("ShopContext Cart Items:", response.cart, response.totalPrice);
          // Set cart items state with response data
          setCartItems(response);
        })
        .catch((error) => console.error("Error fetching cart items:", error));
    }
  }, [isLoggedIn]);

  const updateCartItems = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };

  const contextValue = {
    products,
    cartItems,
    updateCartItems, // Add updateCartItems function to context
    setCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
