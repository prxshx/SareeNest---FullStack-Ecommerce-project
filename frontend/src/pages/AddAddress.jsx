// 🔥 FILE: src/pages/AddAddress.jsx

import React, { useContext, useState } from 'react';
import { addressProvider } from '../Context/UserAddress';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {

    const navigate = useNavigate();

    const { address, setAddress } = useContext(addressProvider);

    const [loading, setLoading] = useState(false);

    // 🔥 Handle Input Change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 🔥 Save Address
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.post(
                "/address/save",
                address
            );

            if (response.status === 200) {

                alert("Address saved successfully");

                // 🔥 Redirect back to cart
                navigate('/cart');
            }

        } catch (error) {

            console.log(error.response?.data || error.message);

            alert("Error saving address");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff7f9] via-[#fff] to-[#fdf2f8] py-14 px-4">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

                {/* 🔥 LEFT SIDE */}
                <div>

                    {/* Premium Tag */}
                    <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        Secure Checkout
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                        Delivery Address
                    </h1>

                    <p className="text-lg text-gray-500 leading-relaxed mb-10">
                        Add your shipping address to continue your premium SareeNest shopping experience.
                    </p>

                    {/* Feature Cards */}
                    <div className="space-y-5">

                        <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Fast Delivery
                            </h3>

                            <p className="text-gray-500">
                                Your sarees will be delivered safely with premium packaging.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Secure Payments
                            </h3>

                            <p className="text-gray-500">
                                Razorpay protected checkout with encrypted transactions.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl shadow-md border border-pink-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Premium Experience
                            </h3>

                            <p className="text-gray-500">
                                Seamless luxury shopping crafted for elegance.
                            </p>
                        </div>

                    </div>

                </div>

                {/* 🔥 RIGHT SIDE FORM */}
                <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.08)] p-10 border border-white">

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Add New Address
                    </h2>

                    <p className="text-gray-500 mb-10">
                        Please fill in accurate delivery details
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-7"
                    >

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Full Address
                            </label>

                            <textarea
                                name="address"
                                value={address.address}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Enter complete delivery address"
                                className="w-full rounded-2xl border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none px-5 py-4 resize-none transition duration-300"
                            />
                        </div>

                        {/* District + State */}
                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    District
                                </label>

                                <input
                                    type="text"
                                    name="district"
                                    value={address.district}
                                    onChange={handleChange}
                                    required
                                    placeholder="District"
                                    className="w-full rounded-2xl border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none px-5 py-4 transition duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    required
                                    placeholder="State"
                                    className="w-full rounded-2xl border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none px-5 py-4 transition duration-300"
                                />
                            </div>

                        </div>

                        {/* Pin + Contact */}
                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Pincode
                                </label>

                                <input
                                    type="text"
                                    name="pinCode"
                                    value={address.pinCode}
                                    onChange={handleChange}
                                    required
                                    placeholder="600001"
                                    className="w-full rounded-2xl border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none px-5 py-4 transition duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Contact Number
                                </label>

                                <input
                                    type="text"
                                    name="contactNo"
                                    value={address.contactNo}
                                    onChange={handleChange}
                                    required
                                    placeholder="9876543210"
                                    className="w-full rounded-2xl border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none px-5 py-4 transition duration-300"
                                />
                            </div>

                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white py-5 rounded-2xl text-lg font-semibold shadow-[0_18px_40px_rgba(236,72,153,0.28)] hover:scale-[1.01] active:scale-[0.99] transition duration-300 disabled:opacity-70"
                        >
                            {
                                loading
                                    ? "Saving Address..."
                                    : "Save Address & Continue"
                            }
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AddAddress;