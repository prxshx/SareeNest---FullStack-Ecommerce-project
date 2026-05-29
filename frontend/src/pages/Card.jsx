// 🔥 FILE: src/components/Card.jsx

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { isAdmin, isLoggedIn } from '../Util/auth';
import { cartContext } from '../Context/CartProvider';

const Card = ({ product }) => {

    const navigate = useNavigate();

    // 🔥 Global cart from provider
    const {
        cartItems,
        cartLoading,
        fetchCartItems
    } = useContext(cartContext);

    // 🔥 Wait until cart data fully loads
    if (cartLoading) {
        return (
            <div className="group bg-white/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.08)] overflow-hidden">

                {/* 🔥 Image Skeleton */}
                <div className="relative overflow-hidden">
                    <div className="w-full h-72 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
                </div>

                {/* 🔥 Content Skeleton */}
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-5 w-1/3 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>

                    <div className="mt-6 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    // 🔥 Check if this product already exists in cart
    const isAdded = cartItems.some(
        (item) => item.saree.id === product.id
    );

    // 🔥 Add to cart
    const addToCart = async () => {

        // 🔥 Guest
        if (!isLoggedIn()) {
            navigate('/login');
            return;
        }

        // 🔥 Admin blocked
        if (isAdmin()) {
            alert("Admins cannot add products to cart");
            return;
        }

        // 🔥 Already exists
        if (isAdded) {
            return;
        }

        try {

            const response = await api.post(`/cart/addProduct/${product.id}`);

            if (response.status === 201) {

                // 🔥 Refresh global cart once
                await fetchCartItems();

                alert("Product added successfully");
            }

        } catch (error) {

            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="group relative bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.14)] transition-all duration-500 overflow-hidden">

            {/* 🔥 Premium Top Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none z-10"></div>

            {/* 🔥 Product Details */}
            <Link to={`/productDetails/${product.id}`}>

                {/* 🔥 Image Section */}
                <div className="relative overflow-hidden bg-white p-4">

                    {/* Premium Badge */}
                    <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[11px] tracking-[0.25em] font-semibold text-gray-700 shadow-md uppercase">
                        Premium
                    </div>

                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-80 object-cover rounded-[1.7rem] shadow-[0_15px_35px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Bottom Fade */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/10 to-transparent rounded-b-[1.7rem]"></div>
                </div>

                {/* 🔥 Product Info */}
                <div className="p-6">

                    {/* Category Style Line */}
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-semibold mb-3">
                        Exclusive Saree
                    </p>

                    {/* Product Name */}
                    <h2 className="text-xl font-semibold text-gray-900 leading-snug min-h-[56px] group-hover:text-pink-600 transition duration-300">
                        {product.name}
                    </h2>

                    {/* Decorative Divider */}
                    <div className="w-12 h-[2px] bg-gray-200 my-4 group-hover:bg-pink-400 transition duration-300"></div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <p className="text-2xl font-light text-gray-900 tracking-wide">
                            ₹ {product.price}
                        </p>

                        <span className="text-sm text-gray-400 font-medium">
                            Luxury Wear
                        </span>
                    </div>

                </div>
            </Link>

            {/* 🔥 Button Section */}
            <div className="px-6 pb-6">

                <div
                    className={`relative text-center rounded-2xl overflow-hidden transition-all duration-300 ${
                        isAdded
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 shadow-[0_10px_25px_rgba(34,197,94,0.35)]"
                            : "bg-gradient-to-r from-gray-900 via-black to-gray-800 hover:from-pink-600 hover:to-pink-500 shadow-[0_12px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_18px_35px_rgba(236,72,153,0.28)]"
                    }`}
                >

                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-white/10"></div>

                    <button
                        className="relative w-full py-4 text-white font-medium text-[16px] tracking-wide rounded-2xl transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed"
                        onClick={addToCart}
                        disabled={isAdded}
                    >
                        {
                            isAdded
                                ? "Added to Cart ✓"
                                : "Add to Cart"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Card;