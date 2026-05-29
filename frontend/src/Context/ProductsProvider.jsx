import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const[product, setProduct] = useState({name:"",desc:"",price:"",category:"",quantity:"",isAvailable:""})
  const[image,setImage] = useState(null);
  const[isUpdate, setIsUpdate] = useState(false);

  const addProduct = (item) => {
    setProducts([...products, item]);
  };

  return (
    <ProductsContext.Provider value={{ products, setProducts, product, setProduct,image,setImage,isUpdate, setIsUpdate }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;