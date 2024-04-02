import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = (props) => {
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {props.data.map((item,i)=>{
                return <Item
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
            })}
      </div>
    </div>
  )
}

export default NewCollections
