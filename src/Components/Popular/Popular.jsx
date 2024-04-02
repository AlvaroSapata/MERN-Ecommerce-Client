import React from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = (props) => {
  // Filtrar los elementos populares por la categoría "t-shirt"
  const popularTShirts = props.data.filter((item) => item.category === "t-shirt");

  return (
    <div className='popular'>
      <h1>POPULAR IN T-SHIRTS</h1>
      <hr />
      <div className="popular-item">
        {popularTShirts.map((item, i) => (
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
        ))}
      </div>
    </div>
  );
};

export default Popular;
