import React, { createContext, useEffect, useState, useContext } from "react";
import { getCartservice } from "./cart.services";
import { AuthContext } from "./auth.context";
import { getProductService } from "../Context/product.services"

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState({
    cart: [],
    totalPrice: 0,
    quantity: 0,
  });

  const fetchInfo = async () => {
    try {
      const data = await getProductService();
      console.log(data)
      if (data.message === "No hay productos.") {
        setAllProducts([]);
      } else {
        setAllProducts(data);
        console.log("ShopContext Products:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getCartservice()
        .then((response) => {
          if (response && response.cart) {
            console.log(
              "ShopContext Cart Items:",
              response.cart,
              response.totalPrice
            );
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
    allProducts,
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
