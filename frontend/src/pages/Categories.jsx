import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {

    const navigate = useNavigate();

    const categories = [

        {
            name: "Silk",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
            desc: "Elegant silk sarees for timeless beauty"
        },

        {
            name: "Cotton",
            image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRlF_q5PZLU09Y7oIlHNjXFn1rTh5_ecFpCaq2EH45MiWPqsJ3hlqlclxU6CuBuulXrgzzue3YYRoMr1YfytY4fL5y7xLk7RKUI72oxzV6Z6FU1ZBc8Vfld",
            desc: "Soft & breathable daily wear collections"
        },

        {
            name: "Wedding",
            image: "https://www.nalli.com/cdn/shop/files/Copy_of_Nalli_Diwali_2025_0982.jpg?v=1758281746&width=1024",
            desc: "Luxury bridal & wedding collections"
        },

        {
            name: "Party Wear",
            image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
            desc: "Shine beautifully at every celebration"
        },

        {
            name: "Designer",
            image: "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/fyprod/t.resize(w:1280,dpr:1)/products/pictures/item/free/original/ri-ritu-kumar/SBXSST0205Q8110934-ROYAL-BLUE/0/6EJN0xFXWW-410504269001_1.jpg",
            desc: "Premium designer curated sarees"
        },

        {
            name: "Traditional",
            image: "https://www.nalli.com/cdn/shop/files/NF2904515_AI.jpg?v=1773721128&width=1800",
            desc: "Classic traditional heritage collections"
        }

    ];

    const handleCategory = (category) => {

        navigate(
            `/category/${encodeURIComponent(category)}`
        );
    };

    return (

        <div className="min-h-screen bg-[#faf7f5] overflow-hidden">

            {/* 🔥 HERO */}
            <div className="relative bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 py-24 overflow-hidden">

                <div className="absolute top-[-100px] left-[-100px] w-[320px] h-[320px] bg-white/20 rounded-full blur-3xl"></div>

                <div className="absolute bottom-[-100px] right-[-100px] w-[320px] h-[320px] bg-white/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

                    <p className="uppercase tracking-[0.4em] text-pink-100 text-sm mb-5 font-semibold">
                        SareeNest Collections
                    </p>

                    <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mb-6">

                        Shop By
                        <br />
                        Categories

                    </h1>

                    <p className="text-pink-100/90 text-xl max-w-3xl mx-auto leading-relaxed">
                        Explore luxurious saree collections crafted for every
                        occasion, celebration & timeless elegance.
                    </p>

                </div>

            </div>

            {/* 🔥 CATEGORY GRID */}
            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {
                        categories.map((category, index) => (

                            <div
                                key={index}
                                onClick={() =>
                                    handleCategory(
                                        category.name
                                    )
                                }
                                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-[0_15px_50px_rgba(0,0,0,0.12)]"
                            >

                                {/* IMAGE */}
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* CONTENT */}
                                <div className="absolute bottom-0 left-0 p-8 w-full">

                                    <div className="flex justify-between items-end gap-5">

                                        <div>

                                            <h2 className="text-4xl font-black text-white mb-4">
                                                {category.name}
                                            </h2>

                                            <p className="text-gray-200 leading-relaxed text-lg">
                                                {category.desc}
                                            </p>

                                        </div>

                                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center group-hover:bg-pink-500 transition duration-300">

                                            <span className="text-white text-3xl">
                                                →
                                            </span>

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

export default Categories;