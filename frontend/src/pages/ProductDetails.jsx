import React, { useContext, useState, useEffect } from 'react';
import { ProductsContext } from '../Context/ProductsProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { cartContext } from '../Context/CartProvider';
import api from '../Services/api';
import { isAdmin, isLoggedIn } from '../Util/auth';

const ProductDetails = () => {

    const navigate = useNavigate();

    const {
        cartItems,
        cartLoading,
        fetchCartItems
    } = useContext(cartContext);

    const { id } = useParams();

    const { products } = useContext(ProductsContext);

    const [product, setProduct] = useState(null);

    // 🔥 Check if already added
    const added = cartItems.some(
        (item) => item.saree.id === Number(id)
    );

    // 🔥 Full cart product
    const addedProduct = cartItems.find(
        (item) => item.saree.id === Number(id)
    );

    const cartQuantity = addedProduct ? addedProduct.quantity : 0;

    // 🔥 Load product
    useEffect(() => {

        const existingProduct = products.find(
            item => item.id === Number(id)
        );

        if (existingProduct) {

            setProduct(existingProduct);

        } else {

            fetch(`http://localhost:8080/saree/getSareeById/${id}`)
                .then(res => res.json())
                .then(data => setProduct(data))
                .catch(err => console.log(err));
        }

    }, [id, products]);

    // 🔥 Add / Increase
    const addToCart = async () => {

        if (!isLoggedIn()) {
            navigate('/login');
            return;
        }

        if (isAdmin()) {
            alert("Admins cannot add products to cart");
            return;
        }

        try {

            const response = await api.post(`/cart/addProduct/${id}`);

            if (response.status === 201) {
                await fetchCartItems();
            }

        } catch (error) {

            console.log(error.response?.data || error.message);
            alert(error.response?.data || "Error adding product");
        }
    };

    // 🔥 Decrease
    const decreaseQuantity = async () => {

        if (!isLoggedIn()) {
            navigate('/login');
            return;
        }

        if (isAdmin()) {
            alert("Admins cannot modify cart");
            return;
        }

        try {

            const response = await api.post(`/cart/decreaseQuantity/${id}`);

            if (response.status === 200) {
                await fetchCartItems();
            }

        } catch (error) {

            console.log(error.response?.data || error.message);
            alert("Error decreasing quantity");
        }
    };

    // 🔥 Delete placeholder
   const deleteProduct = async () => {

    // 🔥 Guest
    if (!isLoggedIn()) {
        navigate('/login');
        return;
    }

    // 🔥 Admin blocked
    if (isAdmin()) {
        alert("Admins cannot modify cart");
        return;
    }

    try {

        const response = await api.delete(`/cart/deleteItem/${id}`);

        if (response.status === 200) {

            alert("Product removed from cart");

            // 🔥 Refresh global cart
            await fetchCartItems();
        }

    } catch (error) {

        console.log(error.response?.data || error.message);

        alert(error.response?.data || "Error deleting product");
    }
};

    // 🔥 Loading
    if (!product || cartLoading) {
        return (
            <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center">
                <div className="text-2xl font-semibold tracking-wide text-gray-700 animate-pulse">
                    Loading Product Experience...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f5f2] py-16 px-4 md:px-10">

            <div className="max-w-7xl mx-auto">

                {/* 🔥 Main Card */}
                <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden">

                    {/* 🔥 LEFT IMAGE SECTION */}
                    <div className="relative bg-gradient-to-br from-[#f4ece6] via-[#f8f3ef] to-[#efe5dc] flex flex-col justify-between p-8 md:p-10 min-h-[850px]">

                        {/* Premium Badge */}
                        <div className="absolute top-8 left-8 z-20 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-md text-sm font-semibold tracking-wide text-gray-700">
                            Premium Collection
                        </div>

                        {/* Decorative Top Right */}
                        <div className="absolute top-10 right-10 w-28 h-28 border border-white/50 rounded-full"></div>
                        <div className="absolute top-20 right-20 w-16 h-16 border border-white/40 rounded-full"></div>

                        {/* Main Bigger Image */}
                        <div className="flex-1 flex items-center justify-center">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full max-h-[720px] object-cover rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.18)] hover:scale-[1.015] transition duration-700"
                            />
                        </div>

                        {/* Bottom Design Strip */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            <div className="h-24 rounded-3xl bg-white/40 backdrop-blur-md flex items-center justify-center text-gray-700 font-medium shadow-sm">
                                Elegance
                            </div>
                            <div className="h-24 rounded-3xl bg-white/30 backdrop-blur-md flex items-center justify-center text-gray-700 font-medium shadow-sm">
                                Luxury
                            </div>
                            <div className="h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-700 font-medium shadow-sm">
                                Heritage
                            </div>
                        </div>

                    </div>

                    {/* 🔥 RIGHT CONTENT */}
                    <div className="p-8 md:p-14 flex flex-col justify-between">

                        {/* 🔥 Product Info */}
                        <div>

                            <p className="uppercase tracking-[0.35em] text-sm text-gray-500 font-semibold mb-4">
                                {product.category}
                            </p>

                            {/* Reduced heading size */}
                            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-snug mb-6">
                                {product.name}
                            </h1>

                            <div className="w-20 h-[2px] bg-gray-300 mb-8"></div>

                            <p className="text-lg leading-9 text-gray-600 mb-10">
                                {product.desc}
                            </p>

                            {/* 🔥 Price + Availability */}
                            <div className="flex flex-wrap items-center gap-6 mb-10">

                                <span className="text-4xl font-light text-gray-900">
                                    ₹ {product.price}
                                </span>

                                <span
                                    className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide ${
                                        product.isAvailable
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                            : "bg-red-50 text-red-700 border border-red-200"
                                    }`}
                                >
                                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                                </span>

                            </div>

                            {/* 🔥 Quantity Available */}
                            <div className="flex items-center justify-between border-t border-b py-5 text-gray-700">

                                <span className="text-lg font-medium">
                                    Available Units
                                </span>

                                <span className="text-2xl font-light">
                                    {product.quantity}
                                </span>

                            </div>

                        </div>

                        {/* 🔥 ACTION SECTION */}
                        <div className="mt-12">

                            {
                                added ? (

                                    <div className="space-y-6">

                                        {/* 🔥 Quantity Controller */}
                                        <div className="flex items-center justify-between bg-[#faf7f4] border border-gray-200 rounded-3xl px-8 py-5">

                                            <button
                                                onClick={decreaseQuantity}
                                                className="w-14 h-14 rounded-full border border-gray-300 text-3xl font-light text-gray-800 hover:bg-gray-900 hover:text-white transition duration-300"
                                            >
                                                −
                                            </button>

                                            <div className="text-center">
                                                <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-1">
                                                    Quantity
                                                </p>
                                                <p className="text-4xl font-light text-gray-900">
                                                    {cartQuantity}
                                                </p>
                                            </div>

                                            <button
                                                onClick={addToCart}
                                                className="w-14 h-14 rounded-full bg-gray-900 text-white text-3xl font-light hover:bg-black transition duration-300"
                                            >
                                                +
                                            </button>

                                        </div>

                                        {/* 🔥 Added */}
                                        <button
                                            disabled
                                            className="w-full bg-emerald-600 text-white py-5 rounded-2xl text-lg tracking-wide font-medium shadow-lg cursor-not-allowed"
                                        >
                                            Added
                                        </button>

                                        {/* 🔥 Delete */}
                                        <button
                                            onClick={()=>deleteProduct()}
                                            className="w-full border border-red-300 text-red-600 py-5 rounded-2xl text-lg font-medium hover:bg-red-50 transition duration-300"
                                        >
                                            Remove from Cart
                                        </button>

                                    </div>

                                ) : (

                                    <button
                                        onClick={addToCart}
                                        className="w-full bg-gray-900 text-white py-6 rounded-2xl text-xl tracking-wide font-medium hover:bg-black transition duration-300 shadow-xl"
                                    >
                                        Add to Cart
                                    </button>

                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;