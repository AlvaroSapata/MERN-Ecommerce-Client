import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import { getProductService } from "../Context/product.services";
import { BounceLoader } from "react-spinners";

const Shop = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInfo = async () => {
    setIsLoading(true);
    try {
      const data = await getProductService();
      if (data.message === "No hay productos.") {
        setAllProducts([]);
        setPopular([]);
        setNewCollection([]);
      } else {
        setAllProducts(data);
        setPopular(data);
        setNewCollection(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoading && (
        <div className="spinner">
          <BounceLoader color="#db1a5a" />
        </div>
      )}
      {!isLoading && allproducts.length === 0 && (
        <p>No hay productos disponibles.</p>
      )}
      <Hero />
      <Popular data={popular} />
      <Offers />
      <NewCollections data={newcollection} />
      <NewsLetter />
    </div>
  );
};

export default Shop;
