import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/api';
import Card from '../pages/Card';

const CategoryProducts = () => {

    const { category } = useParams();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await api.get(
                    `/saree/category/${category}`
                );

                setProducts(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        fetchProducts();

    }, [category]);

    return (

        <div className="min-h-screen bg-[#faf7f5]">

            {/* HERO */}
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 py-20 text-center text-white">

                <p className="uppercase tracking-[0.4em] text-pink-100 text-sm mb-5 font-semibold">
                    SareeNest Category
                </p>

                <h1 className="text-6xl font-black mb-5">
                    {category} Collection
                </h1>

                <p className="text-xl text-pink-100">
                    Premium sarees curated specially for you
                </p>

            </div>

            {/* PRODUCTS */}
            <div className="max-w-7xl mx-auto px-6 py-16">

                {
                    loading ? (

                        <div className="text-center text-3xl text-gray-400 py-24">
                            Loading Products...
                        </div>

                    ) : products.length === 0 ? (

                        <div className="text-center py-24">

                            <h2 className="text-4xl font-black text-gray-700 mb-5">
                                No Products Found
                            </h2>

                            <p className="text-gray-500 text-lg">
                                No sarees available in this category.
                            </p>

                        </div>

                    ) : (

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                            {
                                products.map(product => (

                                    <Card
                                        key={product.id}
                                        product={product}
                                    />

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>
    );
};

export default CategoryProducts;