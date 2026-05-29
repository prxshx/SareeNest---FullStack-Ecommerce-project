import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    // 🔥 FETCH ORDERS
    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await api.get("/order/my-orders");
                console.log(response.data);

                if (response.status === 200) {

                    setOrders(
    Array.isArray(response.data)
        ? response.data
        : []
);
                }

            } catch (error) {

                console.log(
                    error.response?.data || error.message
                );

            } finally {

                setLoading(false);
            }
        };

        fetchOrders();

    }, []);

    // 🔥 STATUS COLORS
    const getStatusStyle = (status) => {

        switch (status) {

            case "PLACED":
                return "bg-blue-500/20 text-blue-300 border-blue-500/20";

            case "CONFIRMED":
                return "bg-cyan-500/20 text-cyan-300 border-cyan-500/20";

            case "PACKED":
                return "bg-yellow-500/20 text-yellow-300 border-yellow-500/20";

            case "SHIPPED":
                return "bg-purple-500/20 text-purple-300 border-purple-500/20";

            case "OUT_FOR_DELIVERY":
                return "bg-orange-500/20 text-orange-300 border-orange-500/20";

            case "DELIVERED":
                return "bg-green-500/20 text-green-300 border-green-500/20";

            case "CANCELLED":
                return "bg-red-500/20 text-red-300 border-red-500/20";

            default:
                return "bg-gray-500/20 text-gray-300 border-gray-500/20";
        }
    };

    // 🔥 LOADING
    if (loading) {

        return (

            <div className="min-h-screen bg-[#060816] flex justify-center items-center">

                <h1 className="text-4xl font-bold text-pink-400 animate-pulse">
                    Loading your orders...
                </h1>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#060816] text-white relative overflow-hidden">

            {/* 🔥 PREMIUM BG */}
            <div className="absolute inset-0 overflow-hidden">

                <div className="absolute top-[-180px] left-[-180px] w-[420px] h-[420px] bg-pink-500/20 blur-[150px] rounded-full"></div>

                <div className="absolute bottom-[-180px] right-[-180px] w-[420px] h-[420px] bg-purple-500/20 blur-[150px] rounded-full"></div>

                <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* 🔥 HERO */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-14">

                    <div>

                        <p className="uppercase tracking-[0.35em] text-pink-400 text-sm mb-4 font-semibold">
                            SareeNest Orders
                        </p>

                        <h1 className="text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent">
                            My Orders
                        </h1>

                        <p className="text-gray-400 text-lg mt-5 max-w-2xl leading-relaxed">
                            Track your luxury saree purchases and monitor delivery progress.
                        </p>

                    </div>

                    {/* 🔥 QUICK STATS */}
                    <div className="flex gap-5 flex-wrap">

                        <div className="bg-white/[0.05] border border-white/10 backdrop-blur-2xl rounded-3xl px-6 py-5 min-w-[170px] shadow-xl">

                            <p className="text-gray-400 text-sm mb-2">
                                Total Orders
                            </p>

                            <h2 className="text-4xl font-black">
                                {orders.length}
                            </h2>

                        </div>

                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl px-6 py-5 min-w-[170px] shadow-[0_15px_40px_rgba(236,72,153,0.35)]">

                            <p className="text-white/80 text-sm mb-2">
                                Delivered
                            </p>

                            <h2 className="text-4xl font-black">
                                {
                                    orders.filter(
                                        order =>
                                            order.orderStatus === "DELIVERED"
                                    ).length
                                }
                            </h2>

                        </div>

                    </div>

                </div>

                {/* 🔥 EMPTY */}
                {
                    orders.length === 0 ? (

                        <div className="bg-white/[0.05] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-20 text-center shadow-2xl">

                            <div className="text-8xl mb-8">
                                🛍️
                            </div>

                            <h2 className="text-5xl font-black mb-5">
                                No Orders Yet
                            </h2>

                            <p className="text-gray-400 text-xl mb-10">
                                Start shopping premium sarees and your orders will appear here.
                            </p>

                            <button
                                onClick={() => navigate('/')}
                                className="bg-gradient-to-r from-pink-500 to-rose-500 px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition shadow-[0_15px_40px_rgba(236,72,153,0.35)]"
                            >
                                Explore Collection
                            </button>

                        </div>

                    ) : (

                        <div className="space-y-10">

                            {
                                orders.map((order) => (

                                    <div
                                        key={order.id}
                                        className="group bg-white/[0.05] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.45)] hover:border-pink-500/30 transition duration-500"
                                    >

                                        {/* 🔥 TOP */}
                                        <div className="p-8 border-b border-white/10">

                                            <div className="flex flex-col xl:flex-row justify-between gap-8">

                                                {/* LEFT */}
                                                <div>

                                                    <div className="flex items-center gap-4 mb-5 flex-wrap">

                                                        <h2 className="text-4xl font-black">
                                                            Order #{order.id}
                                                        </h2>

                                                        <span className={`px-5 py-2 rounded-full text-sm font-semibold border backdrop-blur-xl ${getStatusStyle(order.orderStatus)}`}>
                                                            {order.orderStatus.replaceAll("_", " ")}
                                                        </span>

                                                    </div>

                                                    <div className="space-y-3 text-gray-400">

                                                        <p>
                                                            Payment ID:
                                                            <span className="text-white ml-3 font-medium">
                                                                {order.razorpayPaymentId}
                                                            </span>
                                                        </p>

                                                        <p>
                                                            Ordered At:
                                                            <span className="text-white ml-3 font-medium">
                                                                {
                                                                    new Date(
                                                                        order.orderedAt
                                                                    ).toLocaleString()
                                                                }
                                                            </span>
                                                        </p>

                                                    </div>

                                                </div>

                                                {/* RIGHT */}
                                                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl px-8 py-6 shadow-[0_15px_40px_rgba(236,72,153,0.35)] h-fit">

                                                    <p className="uppercase text-white/70 text-xs tracking-widest mb-2">
                                                        Total Amount
                                                    </p>

                                                    <h2 className="text-4xl font-black">
                                                        ₹ {order.totalAmount}
                                                    </h2>

                                                </div>

                                            </div>

                                        </div>

                                        {/* 🔥 ORDER ITEMS */}
                                        <div className="p-8">

                                            <h3 className="text-2xl font-bold mb-8">
                                                Ordered Products
                                            </h3>

                                            <div className="grid gap-6">

                                                {
                                                    order.orderItems.map((item) => (

                                                        <div
                                                            key={item.id}
                                                            className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row gap-6 items-center"
                                                        >

                                                            {/* IMAGE */}
                                                            <img
                                                                src={item.saree.imageUrl}
                                                                alt={item.saree.name}
                                                                className="w-full md:w-44 h-52 object-cover rounded-2xl"
                                                            />

                                                            {/* DETAILS */}
                                                            <div className="flex-1 w-full">

                                                                <div className="flex flex-col xl:flex-row justify-between gap-6">

                                                                    <div>

                                                                        <h2 className="text-3xl font-black mb-3">
                                                                            {item.saree.name}
                                                                        </h2>

                                                                        <p className="text-gray-400 leading-relaxed max-w-2xl">
                                                                            {item.saree.desc}
                                                                        </p>

                                                                    </div>

                                                                    {/* PRICE */}
                                                                    <div className="shrink-0">

                                                                        <div className="bg-white/[0.05] border border-white/10 rounded-3xl px-6 py-5">

                                                                            <p className="text-gray-400 text-sm mb-2">
                                                                                Subtotal
                                                                            </p>

                                                                            <h2 className="text-3xl font-black text-pink-400">
                                                                                ₹ {item.price * item.quantity}
                                                                            </h2>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                                {/* META */}
                                                                <div className="flex flex-wrap gap-4 mt-6">

                                                                    <div className="bg-white/[0.05] border border-white/10 px-5 py-3 rounded-2xl">

                                                                        <span className="text-gray-400 text-sm">
                                                                            Quantity
                                                                        </span>

                                                                        <h3 className="font-bold text-xl mt-1">
                                                                            {item.quantity}
                                                                        </h3>

                                                                    </div>

                                                                    <div className="bg-white/[0.05] border border-white/10 px-5 py-3 rounded-2xl">

                                                                        <span className="text-gray-400 text-sm">
                                                                            Price
                                                                        </span>

                                                                        <h3 className="font-bold text-xl mt-1">
                                                                            ₹ {item.price}
                                                                        </h3>

                                                                    </div>

                                                                    <div className="bg-white/[0.05] border border-white/10 px-5 py-3 rounded-2xl">

                                                                        <span className="text-gray-400 text-sm">
                                                                            Category
                                                                        </span>

                                                                        <h3 className="font-bold text-xl mt-1">
                                                                            {item.saree.category}
                                                                        </h3>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    ))
                                                }

                                            </div>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>
    );
};

export default Orders;