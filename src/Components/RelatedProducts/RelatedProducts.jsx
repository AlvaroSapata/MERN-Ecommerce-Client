import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { getProductService } from "../../Context/product.services";

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const allProducts = await getProductService();
        if (!allProducts) {
          throw new Error("Failed to fetch data");
        }

        // Filtrar productos que coincidan con la categoría del producto actual
        // y excluyendo el producto actual por su id
        const filteredProducts = allProducts.filter(
          (product) => product.category === category && product._id !== currentProductId
        );

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInfo();
  }, [category, currentProductId]); // Asegúrate de incluir la categoría y el id del producto actual en las dependencias del efecto

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((product) => (
          <Item
            key={product._id}
            id={product._id}
            name={product.name}
            image={product.image}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
