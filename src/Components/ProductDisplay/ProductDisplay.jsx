import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { addCartService,getCartservice } from "../../Context/cart.services";

const ProductDisplay = (props) => {
  const { product } = props;
  const { setCartItems, cartItems } = useContext(ShopContext); // Aquí obtenemos cartItems del contexto
  console.log(props);

  const addToCart = async (productId) => {
    try {
      const updatedCart = await addCartService(productId);
      if (cartItems && cartItems.cart) {
        const existingCartItem = cartItems.cart.find(
          (item) => item.productId._id === productId
        );
        if (existingCartItem) {
          existingCartItem.quantity += 1; // Incrementa la cantidad si el producto ya está en el carrito
        } else {
          // Si el producto no está en el carrito, agrégalo normalmente
          updatedCart.quantity = 1;
          cartItems.cart.push(updatedCart);
        }
  
        // Calcula el precio total sumando los precios de todos los productos en el carrito
        const totalPrice = cartItems.cart.reduce(
          (total, item) => total + item.productId.new_price * item.quantity,
          0
        );
  
        // Actualiza el estado del carrito con los datos actualizados
        setCartItems((prevCartItems) => ({
          ...prevCartItems,
          totalPrice: totalPrice,
          quantity: prevCartItems.quantity + 1, // Incrementa la cantidad total
        }));
  
        // Llama al servicio getCartservice para asegurarse de que los precios se actualicen correctamente
        getCartservice()
          .then((response) => {
            console.log("Updated Cart Items after adding:", response.cart, response.totalPrice);
            setCartItems(response);
          })
          .catch((error) => console.error("Error fetching cart items:", error));
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img2" />
          <img src={product.image} alt="img3" />
          <img src={product.image} alt="img4" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt="img"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product._id)}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span> Women, T-shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
