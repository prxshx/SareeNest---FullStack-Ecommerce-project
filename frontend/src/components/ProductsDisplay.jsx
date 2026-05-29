import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../Context/ProductsProvider';
import Card from '../pages/Card';

const ProductsDisplay = () => {

  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    fetch("http://localhost:8080/saree/getAll")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-gray-100 py-16">

      <div className="max-w-[90%] mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
            Our Premium Collection
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Discover timeless elegance & tradition
          </p>
        </div>

        {/* Products Grid */}
        <div  className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" >
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsDisplay;