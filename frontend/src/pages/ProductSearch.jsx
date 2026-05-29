import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../Services/api';
import Card from '../pages/Card';

const ProductSearch = () => {

    const location = useLocation();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    // 🔥 GET QUERY FROM URL
    const query = new URLSearchParams(
        location.search
    ).get("query");

    // 🔥 FETCH SEARCH PRODUCTS
    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);

                const response = await api.get(
                    `/saree/search?query=${query}`
                );

                setProducts(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

            } catch (error) {

                console.log(error);

                setError(true);

            } finally {

                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        }

    }, [query]);

    return (

        <div className="min-h-screen bg-[#faf7f5]">

            {/* 🔥 HERO */}
            <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 py-20">

                {/* BLUR CIRCLES */}
                <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-white/20 rounded-full blur-3xl"></div>

                <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    <div className="text-center">

                        <p className="uppercase tracking-[0.35em] text-pink-100 text-sm mb-5 font-semibold">
                            SareeNest Search
                        </p>

                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">

                            Search Results
                            <br />
                            for
                            {" "}
                            <span className="text-pink-100">
                                "{query}"
                            </span>

                        </h1>

                        <p className="text-pink-100/90 text-lg max-w-2xl mx-auto leading-relaxed">
                            Explore premium luxury sarees matching your search.
                        </p>

                    </div>

                </div>

            </div>

            {/* 🔥 CONTENT */}
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* 🔥 TOP BAR */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-12">

                    <div>

                        <h2 className="text-4xl font-black text-gray-800 mb-2">

                            {
                                loading
                                    ? "Searching..."
                                    : `${products.length} Products Found`
                            }

                        </h2>

                        <p className="text-gray-500 text-lg">
                            Showing products related to
                            {" "}
                            <span className="font-semibold text-pink-600">
                                "{query}"
                            </span>
                        </p>

                    </div>

                    <Link
                        to='/'
                        className="bg-black text-white px-7 py-4 rounded-2xl font-semibold hover:scale-105 active:scale-95 transition shadow-lg"
                    >
                        Back To Home
                    </Link>

                </div>

                {/* 🔥 LOADING */}
                {
                    loading && (

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                            {
                                Array.from({ length: 8 }).map((_, index) => (

                                    <div
                                        key={index}
                                        className="bg-white rounded-[2rem] overflow-hidden shadow-lg animate-pulse"
                                    >

                                        <div className="w-full h-80 bg-gray-200"></div>

                                        <div className="p-6">

                                            <div className="h-6 bg-gray-200 rounded mb-4"></div>

                                            <div className="h-5 w-1/2 bg-gray-200 rounded"></div>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>
                    )
                }

                {/* 🔥 ERROR */}
                {
                    error && (

                        <div className="bg-red-50 border border-red-200 text-red-500 rounded-[2rem] py-16 px-8 text-center shadow-lg">

                            <div className="text-6xl mb-5">
                                ❌
                            </div>

                            <h2 className="text-3xl font-bold mb-3">
                                Something Went Wrong
                            </h2>

                            <p className="text-lg">
                                Failed to fetch products. Please try again later.
                            </p>

                        </div>
                    )
                }

                {/* 🔥 EMPTY */}
                {
                    !loading &&
                    !error &&
                    products.length === 0 && (

                        <div className="bg-white rounded-[3rem] py-24 px-8 text-center shadow-xl border border-gray-100">

                            <div className="text-8xl mb-6">
                                🔍
                            </div>

                            <h2 className="text-4xl font-black text-gray-800 mb-5">
                                No Products Found
                            </h2>

                            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                We couldn't find any sarees matching
                                {" "}
                                <span className="font-semibold text-pink-600">
                                    "{query}"
                                </span>.
                                Try searching with another keyword.
                            </p>

                            <Link
                                to='/'
                                className="inline-block mt-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition"
                            >
                                Explore Collection
                            </Link>

                        </div>
                    )
                }

                {/* 🔥 PRODUCTS */}
                {
                    !loading &&
                    !error &&
                    products.length > 0 && (

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

export default ProductSearch;