import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to- from-rose-50 to-white min-h-screen">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-pink-700 tracking-wide mb-6">
          Timeless Elegance
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          We celebrate the richness of Indian heritage through exquisite sarees 
          that blend tradition with contemporary sophistication. Every drape 
          reflects craftsmanship, culture, and grace.
        </p>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center py-16">

        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
            alt="Luxury Saree"
            className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
          />
        
        </div>

        {/* Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Our Journey
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Born from a deep love for India's textile artistry, our brand was founded 
            to preserve and promote the legacy of handwoven sarees. We collaborate 
            directly with master weavers to bring authentic Kanchipuram silks, 
            Banarasi masterpieces, and modern designer drapes to life.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Each collection is curated with care — ensuring luxurious fabric, 
            intricate zari detailing, and superior finishing. Whether for weddings, 
            festivals, or milestone celebrations, our sarees are designed to make 
            every moment unforgettable.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            What Defines Us
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">

          <div className="bg-rose-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-pink-700 mb-4">
              Authentic Craftsmanship
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We source directly from skilled artisans, ensuring every saree 
              carries genuine heritage and unmatched quality.
            </p>
          </div>

          <div className="bg-rose-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-pink-700 mb-4">
              Premium Quality
            </h3>
            <p className="text-gray-600 leading-relaxed">
              From mulberry silk to intricate zari weaving, we ensure luxurious 
              finishing that stands the test of time.
            </p>
          </div>

          <div className="bg-rose-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-pink-700 mb-4">
              Customer Delight
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We believe elegance should feel effortless — from browsing to delivery 
              and beyond.
            </p>
          </div>

        </div>
      </div>

      {/* Closing Section */}
      <div className="bg-pink-700 text-white py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Wear Tradition. Own Elegance.
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed opacity-90">
          Discover sarees that embody culture, craftsmanship, and confidence. 
          Because true beauty is timeless.
        </p>
      </div>

    </div>
  );
};

export default About;