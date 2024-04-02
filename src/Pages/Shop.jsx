import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Shop = () => {
  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const popularResponse = await fetch('http://localhost:5005/products/all');
        const newCollectionResponse = await fetch('http://localhost:5005/products/all');

        if (!popularResponse.ok || !newCollectionResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const popularData = await popularResponse.json();
        const newCollectionData = await newCollectionResponse.json();

        setPopular(popularData);
        setNewCollection(newCollectionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Hero />
      <Popular data={popular} />
      <Offers />
      <NewCollections data={newcollection} />
      <NewsLetter />
    </div>
  );
};

export default Shop;
