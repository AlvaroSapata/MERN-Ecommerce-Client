import service from "./config.services";

const testCartService = () => {
    return service.get("/cart/");
  };

  // GET /cart/userCart -> gets user cart, quantity of products and total price
const getCartservice = () => {
    return service.get("/cart/userCart");
  };

  // PATCH /cart/:productId/add -> adds a product to the cart
const addCartService = (productId) => {
    return service.patch(`/cart/${productId}/add`);
  };
  
  // PATCH /cart/:productId/pull -> pulls a product from the cart
  const pullCartService = (productId) => {
    return service.patch(`/cart/${productId}/pull`);
  };
  
  // PUT /cart/deleteall -> deletes all products from the cart
  const deleteCartService = () => {
    return service.put("/cart/deleteall");
  };

  //! NOT NEEDED ??
  const getTotalCartService = () => {
    return service.get("/cart/total");
  };

export { testCartService,getCartservice, addCartService, pullCartService, deleteCartService, getTotalCartService};
