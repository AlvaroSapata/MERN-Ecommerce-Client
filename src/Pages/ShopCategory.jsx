import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
// import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";
import { getProductService } from "../Context/product.services";
import { BounceLoader } from "react-spinners";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState(""); // Estado para almacenar la opción seleccionada
  const [sortOrder, setSortOrder] = useState("asc"); // Estado para almacenar el orden de clasificación
  const [isLoading, setIsLoading] = useState(true);

  const fetchInfo = async () => {
    setIsLoading(true);
    try {
      const data = await getProductService();
      if (data.message === "No hay productos.") {
        setAllProducts([]);
      } else {
        setAllProducts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Función para manejar cambios en la selección del desplegable
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Función para cambiar el orden de clasificación
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Función para ordenar los productos según la opción seleccionada y el orden especificado
  const sortProducts = (products) => {
    if (sortBy === "price") {
      return products.sort((a, b) =>
        sortOrder === "asc"
          ? a.new_price - b.new_price
          : b.new_price - a.new_price
      );
    } else if (sortBy === "creation") {
      return products.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    return products;
  };

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1 - 12</span> out of {allproducts.length} Products
        </p>
        <div className="shopcategory-sort">
          Sort by:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="" disabled>
              Select
            </option>
            <option value="price">Price</option>
            <option value="creation">Creation Date</option>
          </select>
          <button onClick={toggleSortOrder}>
            {sortBy === "price" &&
              ` ${sortOrder === "asc" ? "\u25B2" : "\u25BC"}`}
            {sortBy === "creation" &&
              ` ${sortOrder === "asc" ? "\u25B2" : "\u25BC"}`}
          </button>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortProducts(allproducts).map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                id={item._id}
                key={i}
                name={item.name}
                image={item.image}
                // Mostrar solo old_price si old_price y new_price son iguales
                new_price={item.new_price}
                old_price={
                  item.old_price === item.new_price ? null : item.old_price
                }
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        <Link to="/" style={{ textDecoration: "none" }}>
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default ShopCategory;
