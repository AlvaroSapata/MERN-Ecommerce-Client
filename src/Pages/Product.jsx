import React, { useContext } from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const product = allProducts.find((product) => product._id === productId);
  return (
    <div>
      {product && (
        <>
          <Breadcrums product={product}/>
          <ProductDisplay product={product}/>
          <DescriptionBox/>
          <RelatedProducts category={product.category} currentProductId={product._id}/>
        </>
      )}
    </div>
  );
  
}


export default Product
