import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (

    <footer className="relative overflow-hidden bg-[#070b18] text-white pt-24">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-pink-500/20 rounded-full blur-[140px]"></div>

      <div className="absolute bottom-[-180px] right-[-180px] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[160px]"></div>

      {/* 🔥 MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14 pb-16 border-b border-white/10">

          {/* 🔥 BRAND */}
          <div>

            <h1 className="text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent mb-6">
              SareeNest
            </h1>

            <p className="text-gray-400 leading-relaxed text-lg">
              Experience the elegance of timeless sarees crafted for
              modern luxury. Discover premium collections designed
              for every celebration & unforgettable moment.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-8">

              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500 transition duration-300 cursor-pointer">

                <span className="text-xl">
                  📸
                </span>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 transition duration-300 cursor-pointer">

                <span className="text-xl">
                  📘
                </span>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 transition duration-300 cursor-pointer">

                <span className="text-xl">
                  💬
                </span>

              </div>

            </div>

          </div>

          {/* 🔥 QUICK LINKS */}
          <div>

            <h2 className="text-2xl font-bold mb-8">
              Quick Links
            </h2>

            <div className="flex flex-col gap-5 text-gray-400">

              <Link
                to="/"
                className="hover:text-pink-400 transition duration-300 text-lg"
              >
                Home
              </Link>

              <Link
                to="/categories"
                className="hover:text-pink-400 transition duration-300 text-lg"
              >
                Categories
              </Link>

              <Link
                to="/contact"
                className="hover:text-pink-400 transition duration-300 text-lg"
              >
                Contact
              </Link>

              <Link
                to="/about"
                className="hover:text-pink-400 transition duration-300 text-lg"
              >
                About Us
              </Link>

              <Link
                to="/cart"
                className="hover:text-pink-400 transition duration-300 text-lg"
              >
                Cart
              </Link>

              <Link
                to="/my-orders"
                className="hover:text-pink-400 transition duration-300 text-lg"
              >
                My Orders
              </Link>

            </div>

          </div>

          {/* 🔥 SUPPORT */}
          <div>

            <h2 className="text-2xl font-bold mb-8">
              Customer Support
            </h2>

            <div className="flex flex-col gap-5 text-gray-400 text-lg">

              <p className="hover:text-white transition cursor-pointer">
                Shipping Policy
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Return & Refund
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Terms & Conditions
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Secure Payments
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Premium Support
              </p>

            </div>

          </div>

          {/* 🔥 CONTACT */}
          <div>

            <h2 className="text-2xl font-bold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-2xl shrink-0">

                  📍

                </div>

                <div>

                  <h3 className="font-bold text-lg mb-1">
                    Location
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    Chennai, Tamil Nadu,
                    India
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl shrink-0">

                  📞

                </div>

                <div>

                  <h3 className="font-bold text-lg mb-1">
                    Phone
                  </h3>

                  <p className="text-gray-400">
                    +91 9940176991
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl shrink-0">

                  📧

                </div>

                <div>

                  <h3 className="font-bold text-lg mb-1">
                    Email
                  </h3>

                  <p className="text-gray-400 break-all">
                    prakash28srm@gmail.com
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* 🔥 NEWSLETTER */}
        <div className="py-16 flex flex-col lg:flex-row justify-between items-center gap-10">

          <div>

            <h2 className="text-4xl font-black mb-4">
              Join Our Luxury Community
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl">
              Stay updated with exclusive saree launches,
              premium collections & special offers.
            </p>

          </div>

          <form className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[320px] bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-pink-500 text-white"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 active:scale-95 transition duration-300 shadow-[0_10px_35px_rgba(236,72,153,0.35)]"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>

      {/* 🔥 BOTTOM BAR */}
      <div className="relative z-10 border-t border-white/10 py-8 px-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} SareeNest.
            All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-gray-500 text-sm">

            <p className="hover:text-pink-400 transition cursor-pointer">
              Privacy Policy
            </p>

            <p className="hover:text-pink-400 transition cursor-pointer">
              Terms
            </p>

            <p className="hover:text-pink-400 transition cursor-pointer">
              Cookies
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;