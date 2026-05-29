import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [checkingOut, setCheckingOut] = useState(false);

    // 🔥 FETCH CART ITEMS
    useEffect(() => {

        fetchCartItems();

    }, []);

    const fetchCartItems = async () => {

        try {

            const response = await api.get(
                "/cart/getCartItems"
            );

            if (response.status === 200) {

                setCartItems(response.data);
            }

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

        } finally {

            setLoading(false);
        }
    };

    // 🔥 TOTAL PRICE
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + (
                item.saree.price * item.quantity
            ),
        0
    );

    // 🔥 DECREASE QUANTITY
    const decreaseQuantity = async (id) => {

        try {

            await api.post(
                `/cart/decreaseQuantity/${id}`
            );

            fetchCartItems();

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );
        }
    };

    // 🔥 INCREASE QUANTITY
    const increaseQuantity = async (id) => {

        try {

            await api.post(
                `/cart/addProduct/${id}`
            );

            fetchCartItems();

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );
        }
    };

    // 🔥 DELETE ITEM
    const deleteItem = async (id) => {

        try {

            await api.delete(
                `/cart/deleteItem/${id}`
            );

            // 🔥 REMOVE INSTANTLY
            setCartItems(prev =>
                prev.filter(
                    item =>
                        item.saree.id !== id
                )
            );

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

            alert("Failed to remove item");
        }
    };

    // 🔥 OPEN RAZORPAY
    const openRazorpay = async () => {

        try {

            const response = await api.post(
                `/payment/createOrder?amount=${totalPrice}`
            );

            const order = response.data;

            const options = {

                key: "rzp_test_SrTm3yYhWpqjzk",

                amount: order.amount,

                currency: order.currency,

                name: "SareeNest",

                description:
                    "Premium Saree Purchase",

                order_id: order.id,

                handler: async function (response) {

                    try {

                        // 🔥 VERIFY PAYMENT
                        const verifyResponse =
                            await api.post(
                                "/order/verify-payment",
                                response
                            );

                        if (
                            verifyResponse.status === 200
                        ) {

                            alert(
                                "Order placed successfully 🎉"
                            );

                            setCartItems([]);

                            navigate("/my-orders");
                        }

                    } catch (error) {

                        console.log(
                            error.response?.data ||
                            error.message
                        );

                        alert(
                            error.response?.data ||
                            "Payment verification failed"
                        );
                    }
                },

                prefill: {
                    name: "SareeNest Customer"
                },

                theme: {
                    color: "#db2777"
                }
            };

            const razorpay =
                new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.log(error);

            alert("Payment failed");
        }
    };

    // 🔥 CHECK ADDRESS BEFORE PAYMENT
    const handleCheckout = async () => {

        try {

            setCheckingOut(true);

            const response = await api.get(
                "/address/get"
            );

            if (response.status === 200) {

                openRazorpay();
            }

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

            navigate("/add-address");

        } finally {

            setCheckingOut(false);
        }
    };

    // 🔥 LOADING
    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center bg-[#faf7f5]">

                <h1 className="text-3xl font-black text-pink-600 animate-pulse">
                    Loading your luxury cart...
                </h1>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#faf7f5] py-14 px-4">

            <div className="max-w-7xl mx-auto">

                {/* 🔥 HERO */}
                <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-[3rem] px-10 py-16 mb-14 shadow-[0_20px_60px_rgba(236,72,153,0.25)]">

                    <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-white/20 rounded-full blur-3xl"></div>

                    <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">

                        <p className="uppercase tracking-[0.35em] text-pink-100 text-sm mb-5 font-semibold">
                            SareeNest Cart
                        </p>

                        <h1 className="text-6xl font-black text-white leading-tight mb-5">

                            Your Luxury
                            <br />
                            Shopping Cart

                        </h1>

                        <p className="text-pink-100 text-xl max-w-2xl leading-relaxed">
                            Review your selected premium sarees before
                            secure checkout.
                        </p>

                    </div>

                </div>

                {
                    cartItems.length === 0 ? (

                        <div className="bg-white rounded-[3rem] shadow-xl p-20 text-center border border-gray-100">

                            <div className="text-8xl mb-8">
                                🛍️
                            </div>

                            <h2 className="text-5xl font-black text-gray-800 mb-5">
                                Your Cart Is Empty
                            </h2>

                            <p className="text-gray-500 text-xl mb-10">
                                Add some luxurious sarees to begin shopping.
                            </p>

                            <button
                                onClick={() => navigate("/")}
                                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 active:scale-95 transition shadow-lg"
                            >
                                Explore Sarees
                            </button>

                        </div>

                    ) : (

                        <div className="grid lg:grid-cols-3 gap-10">

                            {/* 🔥 CART ITEMS */}
                            <div className="lg:col-span-2 space-y-8">

                                {
                                    cartItems.map(item => (

                                        <div
                                            key={item.id}
                                            className="bg-white rounded-[2.5rem] p-7 shadow-lg hover:shadow-2xl transition duration-500 border border-gray-100"
                                        >

                                            <div className="flex flex-col xl:flex-row gap-8">

                                                {/* IMAGE */}
                                                <div className="relative overflow-hidden rounded-[2rem]">

                                                    <img
                                                        src={item.saree.imageUrl}
                                                        alt={item.saree.name}
                                                        className="w-full xl:w-64 h-[340px] object-cover hover:scale-105 transition duration-500"
                                                    />

                                                </div>

                                                {/* DETAILS */}
                                                <div className="flex-1 flex flex-col justify-between">

                                                    <div>

                                                        <div className="flex justify-between gap-5 items-start mb-5">

                                                            <div>

                                                                <h2 className="text-4xl font-black text-gray-800 mb-3">
                                                                    {item.saree.name}
                                                                </h2>

                                                                <p className="text-gray-500 text-lg leading-relaxed">
                                                                    Premium elegance crafted for
                                                                    timeless beauty & celebrations.
                                                                </p>

                                                            </div>

                                                            {/* DELETE */}
                                                            <button
                                                                onClick={() =>
                                                                    deleteItem(
                                                                        item.saree.id
                                                                    )
                                                                }
                                                                className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 text-2xl font-bold shrink-0"
                                                            >
                                                                ×
                                                            </button>

                                                        </div>

                                                        <div className="flex flex-wrap gap-4 items-center mb-8">

                                                            <div className="bg-pink-50 text-pink-600 px-6 py-3 rounded-full font-bold text-lg">
                                                                ₹ {item.saree.price}
                                                            </div>

                                                            <div className="bg-purple-50 text-purple-600 px-6 py-3 rounded-full font-bold text-lg">
                                                                Subtotal:
                                                                {" "}
                                                                ₹ {
                                                                    item.saree.price *
                                                                    item.quantity
                                                                }
                                                            </div>

                                                        </div>

                                                    </div>

                                                    {/* QUANTITY CONTROLS */}
                                                    <div className="flex flex-wrap justify-between items-center gap-5">

                                                        <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden">

                                                            {/* DECREASE */}
                                                            <button
                                                                onClick={() =>
                                                                    decreaseQuantity(
                                                                        item.saree.id
                                                                    )
                                                                }
                                                                className="w-16 h-16 text-3xl font-bold text-gray-700 hover:bg-pink-500 hover:text-white transition"
                                                            >
                                                                -
                                                            </button>

                                                            {/* QUANTITY */}
                                                            <div className="w-20 text-center text-2xl font-black text-gray-800">
                                                                {item.quantity}
                                                            </div>

                                                            {/* INCREASE */}
                                                            <button
                                                                onClick={() =>
                                                                    increaseQuantity(
                                                                        item.saree.id
                                                                    )
                                                                }
                                                                className="w-16 h-16 text-3xl font-bold text-gray-700 hover:bg-pink-500 hover:text-white transition"
                                                            >
                                                                +
                                                            </button>

                                                        </div>

                                                        <div className="text-right">

                                                            <p className="text-gray-500 text-sm mb-1">
                                                                Total Price
                                                            </p>

                                                            <h2 className="text-4xl font-black text-pink-600">
                                                                ₹ {
                                                                    item.saree.price *
                                                                    item.quantity
                                                                }
                                                            </h2>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))
                                }

                            </div>

                            {/* 🔥 ORDER SUMMARY */}
                            <div className="sticky top-24 h-fit">

                                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100">

                                    <h2 className="text-4xl font-black text-gray-800 mb-8">
                                        Order Summary
                                    </h2>

                                    {/* STATS */}
                                    <div className="space-y-6 mb-10">

                                        <div className="flex justify-between text-lg">

                                            <span className="text-gray-500">
                                                Total Products
                                            </span>

                                            <span className="font-black text-gray-800">
                                                {cartItems.length}
                                            </span>

                                        </div>

                                        <div className="flex justify-between text-lg">

                                            <span className="text-gray-500">
                                                Total Quantity
                                            </span>

                                            <span className="font-black text-gray-800">

                                                {
                                                    cartItems.reduce(
                                                        (total, item) =>
                                                            total + item.quantity,
                                                        0
                                                    )
                                                }

                                            </span>

                                        </div>

                                        <div className="border-t pt-6 flex justify-between items-center">

                                            <span className="text-2xl font-bold text-gray-800">
                                                Total Price
                                            </span>

                                            <span className="text-4xl font-black text-pink-600">
                                                ₹ {totalPrice}
                                            </span>

                                        </div>

                                    </div>

                                    {/* CHECKOUT */}
                                    <button
                                        onClick={handleCheckout}
                                        disabled={checkingOut}
                                        className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white py-5 rounded-2xl text-xl font-black hover:scale-105 active:scale-95 transition duration-300 shadow-[0_15px_40px_rgba(236,72,153,0.35)] disabled:opacity-70"
                                    >

                                        {
                                            checkingOut
                                                ? "Checking Address..."
                                                : "Proceed To Checkout"
                                        }

                                    </button>

                                    {/* CONTINUE SHOPPING */}
                                    <button
                                        onClick={() => navigate("/")}
                                        className="w-full mt-5 border-2 border-pink-500 text-pink-600 py-5 rounded-2xl text-lg font-bold hover:bg-pink-50 transition"
                                    >
                                        Continue Shopping
                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>
    );
};

export default Cart;