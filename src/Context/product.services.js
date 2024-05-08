import service from "./config.services";

const getProductService = () => {
  return service.get("/products/all");
};

const getProductDetailsService = (productId) => {
  return service.get(`/products/${productId}`);
};

export {
  getProductService,
  getProductDetailsService,
};
