import React, { useContext } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { pullCartService } from "../../Context/cart.services";

const CartItems = () => {
  const { cartItems, setCartItems } = useContext(ShopContext);
  const { totalPrice, cart, quantity } = cartItems;

  const removeItem = async (productId) => {
    try {
      console.log(productId);
      await pullCartService(productId); // Llamar al servicio para eliminar el producto del carrito
      // Actualizar el estado del carrito eliminando el elemento
      const updatedCart = cart.map(item =>
        item.productId._id === productId
          ? { ...item, quantity: item.quantity - 1 } // Reducir la cantidad del producto eliminado
          : item
      ).filter(item => item.quantity > 0); // Eliminar el producto del carrito si la cantidad es cero
  
      // Calcular el nuevo precio total y la nueva cantidad
      const newTotalPrice = updatedCart.reduce((total, item) => total + (item.productId.new_price * item.quantity), 0);
      const newQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);
  
      // Actualizar el estado del carrito con los nuevos valores
      setCartItems(prevCartItems => ({
        ...prevCartItems,
        cart: updatedCart,
        totalPrice: newTotalPrice,
        quantity: newQuantity
      }));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  
  
  


  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cart.map((cartItem) => (
        <div key={cartItem._id}>
          <div className="cartitems-format-main cartitems-format">
            <img className="cartitems-product-icon" src={cartItem.productId.image} alt="" />
            <p>{cartItem.productId.name}</p>
            <p>${cartItem.productId.new_price}</p>
            <button className="cartitems-quantity">{cartItem.quantity}</button>
            <p>${cartItem.productId.new_price * cartItem.quantity}</p>
            <img
              className="cartitems-remove-icon"
              src={cross_icon}
              alt=""
              onClick={() => removeItem(cartItem.productId._id)} // Call removeItem with the product ID
            />
          </div>
          <hr />
        </div>
      ))}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Total Items</p>
              <p>{quantity} Items</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalPrice}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
