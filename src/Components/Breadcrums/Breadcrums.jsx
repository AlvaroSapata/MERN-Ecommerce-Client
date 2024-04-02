import React from 'react';
import './Breadcrums.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrums = (props) => {
  const { product } = props;

  // Verificar si product está definido antes de acceder a sus propiedades
  if (!product) {
    return null; // O mostrar un mensaje de carga u otra lógica apropiada
  }

  return (
    <div className='breadcrums'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name} 
    </div>
  );
};

export default Breadcrums;
