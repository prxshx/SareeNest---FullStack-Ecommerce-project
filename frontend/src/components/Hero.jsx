import React from "react";

const Hero = () => {
  return (
    <div
      className="relative h-[90vh] w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Elegance in Every <br /> Drape
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover timeless saree collections crafted with tradition,
          elegance, and modern style.
        </p>

        <button className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-2xl font-semibold text-lg shadow-lg">
          Shop Collection
        </button>
      </div>
    </div>
  );
};

export default Hero;