import React, { useContext } from 'react';
import { ProductsContext } from '../Context/ProductsProvider';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { isAdmin, isLoggedIn } from '../Util/auth';

const UpdateOrDeleteProducts = () => {

    const {
        products,
        setProducts,
        setIsUpdate
    } = useContext(ProductsContext);

    const navigate = useNavigate();

    // 🔥 DELETE PRODUCT
    const deleteHandler = async (id) => {

        if (!isLoggedIn()) {
            navigate('/login');
            return;
        }

        if (!isAdmin()) {
            alert("Only admins can delete products");
            return;
        }

        try {

            const response = await api.delete(`/saree/delete/${id}`);

            if (response.status === 200) {

                setProducts(prev =>
                    prev.filter(item => item.id !== id)
                );

                alert("Product deleted successfully");
            }

        } catch (error) {

            console.log(error.response?.data || error.message);

            alert(error.response?.data || "Error deleting product");
        }
    };

    // 🔥 UPDATE
    const handleUpdate = (id) => {

        setIsUpdate(true);

        navigate(`/updateProduct/${id}`);
    };

    return (

        <div className="min-h-screen bg-[#060816] text-white relative overflow-hidden">

            {/* 🔥 PREMIUM BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden">

                <div className="absolute top-[-180px] left-[-180px] w-[420px] h-[420px] bg-pink-500/20 blur-[150px] rounded-full"></div>

                <div className="absolute bottom-[-180px] right-[-180px] w-[420px] h-[420px] bg-purple-500/20 blur-[150px] rounded-full"></div>

                <div className="absolute top-[45%] left-[45%] w-[250px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* 🔥 HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">

                    <div>

                        <p className="uppercase tracking-[0.35em] text-pink-400 text-sm mb-4 font-semibold">
                            SareeNest Inventory
                        </p>

                        <h1 className="text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent">
                            Product Management
                        </h1>

                        <p className="text-gray-400 text-lg mt-5 max-w-2xl leading-relaxed">
                            Control your luxury collections with modern inventory management.
                        </p>

                    </div>

                    {/* 🔥 STATS */}
                    <div className="flex gap-5 flex-wrap">

                        <div className="bg-white/[0.05] border border-white/10 backdrop-blur-2xl rounded-3xl px-6 py-5 min-w-[170px] shadow-xl">

                            <p className="text-gray-400 text-sm mb-2">
                                Total Products
                            </p>

                            <h2 className="text-4xl font-black">
                                {products.length}
                            </h2>

                        </div>

                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl px-6 py-5 min-w-[170px] shadow-[0_15px_40px_rgba(236,72,153,0.35)]">

                            <p className="text-white/80 text-sm mb-2">
                                Available
                            </p>

                            <h2 className="text-4xl font-black">
                                {
                                    products.filter(
                                        p => p.isAvailable
                                    ).length
                                }
                            </h2>

                        </div>

                    </div>

                </div>

                {/* 🔥 PRODUCT GRID */}
                <div className="grid gap-8">

                    {
                        products.map((item) => (

                            <div
                                key={item.id}
                                className="group bg-white/[0.05] border border-white/10 backdrop-blur-3xl rounded-[2.2rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.45)] hover:border-pink-500/30 transition duration-500"
                            >

                                <div className="grid lg:grid-cols-[280px_1fr]">

                                    {/* 🔥 IMAGE */}
                                    <div className="relative overflow-hidden">

                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                                        {/* Availability */}
                                        <div className="absolute top-5 left-5">

                                            <span className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-xl border ${
                                                item.isAvailable
                                                    ? "bg-green-500/20 text-green-300 border-green-500/20"
                                                    : "bg-red-500/20 text-red-300 border-red-500/20"
                                            }`}>
                                                {
                                                    item.isAvailable
                                                        ? "Available"
                                                        : "Out Of Stock"
                                                }
                                            </span>

                                        </div>

                                    </div>

                                    {/* 🔥 CONTENT */}
                                    <div className="p-8 flex flex-col justify-between">

                                        {/* TOP */}
                                        <div>

                                            <div className="flex flex-col xl:flex-row justify-between gap-6 mb-6">

                                                <div>

                                                    <h2 className="text-4xl font-black mb-4 leading-tight">
                                                        {item.name}
                                                    </h2>

                                                    <p className="text-gray-400 leading-relaxed text-[15px] max-w-3xl">
                                                        {item.desc}
                                                    </p>

                                                </div>

                                                {/* PRICE */}
                                                <div className="shrink-0">

                                                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl px-7 py-5 shadow-[0_15px_40px_rgba(236,72,153,0.35)]">

                                                        <p className="uppercase text-white/70 text-xs tracking-widest mb-1">
                                                            Price
                                                        </p>

                                                        <h2 className="text-3xl font-black">
                                                            ₹ {item.price}
                                                        </h2>

                                                    </div>

                                                </div>

                                            </div>

                                            {/* META */}
                                            <div className="flex flex-wrap gap-4">

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
                                                        Product ID
                                                    </span>

                                                    <h3 className="font-bold text-xl mt-1">
                                                        #{item.id}
                                                    </h3>

                                                </div>

                                                <div className="bg-white/[0.05] border border-white/10 px-5 py-3 rounded-2xl">

                                                    <span className="text-gray-400 text-sm">
                                                        Category
                                                    </span>

                                                    <h3 className="font-bold text-xl mt-1">
                                                        {item.category}
                                                    </h3>

                                                </div>

                                            </div>

                                        </div>

                                        {/* 🔥 ACTIONS */}
                                        <div className="flex gap-4 mt-8 flex-wrap">

                                            <button
                                                onClick={() => handleUpdate(item.id)}
                                                className="bg-gradient-to-r from-blue-500 to-indigo-500 px-7 py-3 rounded-2xl font-semibold hover:scale-105 active:scale-95 transition shadow-[0_10px_35px_rgba(59,130,246,0.35)]"
                                            >
                                                Update Product
                                            </button>

                                            <button
                                                onClick={() => deleteHandler(item.id)}
                                                className="bg-gradient-to-r from-red-500 to-rose-500 px-7 py-3 rounded-2xl font-semibold hover:scale-105 active:scale-95 transition shadow-[0_10px_35px_rgba(239,68,68,0.35)]"
                                            >
                                                Delete Product
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>
    );
};

export default UpdateOrDeleteProducts;