import React from "react";
import { Link } from "react-router-dom"; // Importar Link desde react-router-dom
import "./Breadcrums.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrums = (props) => {
  const { product } = props;

  // Verificar si product está definido antes de acceder a sus propiedades
  if (!product) {
    return null; // O mostrar un mensaje de carga u otra lógica apropiada
  }

  // Convertir la primera letra de product.category a mayúscula
  const formattedCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  // Convertir la primera letra de product.name a mayúscula
  const formattedName = product.name.charAt(0).toUpperCase() + product.name.slice(1);

  return (
    <div className="breadcrums">
      {/* Enlaces para navegar a SHOP y la categoría */}
      <Link to="/">SHOP</Link> <img src={arrow_icon} alt="" />{" "}
      <Link to={`/${product.category}`}>{formattedCategory}</Link>{" "}
      <img src={arrow_icon} alt="" /> {formattedName}
    </div>
  );
};

export default Breadcrums;
