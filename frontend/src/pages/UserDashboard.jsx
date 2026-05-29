import React, { useEffect, useState } from "react";
import { getToken, logout } from "../Util/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const UserDashboard = () => {

  const navigate = useNavigate();

  const token = getToken();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  let username = "";
  let roles = "";

  if (token) {

    try {

      const decoded = jwtDecode(token);

      username = decoded.sub;

      roles = decoded.roles;

    } catch (err) {

      console.log("Invalid token");
    }
  }

  // 🔥 FETCH ORDERS
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const response = await api.get(
          "/order/my-orders"
        );

        setOrders(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] overflow-hidden">

      {/* 🔥 TOP HERO SECTION */}
      <div className="relative bg-gradient-to-r from-[#ff4d8d] via-[#ff5ca2] to-[#ff8dc7] pb-28 pt-16 px-6 shadow-2xl">

        {/* Decorative blur */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-20 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

            {/* LEFT */}
            <div>

              <p className="text-white/80 text-lg mb-3 tracking-wide">
                Welcome back
              </p>

              <h1 className="text-5xl font-black text-white mb-4">
                {username}
              </h1>

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-5 py-2 rounded-full border border-white/20">

                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

                <span className="text-white font-semibold">
                  {roles}
                </span>

              </div>

            </div>

            {/* RIGHT */}
            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 min-w-[300px] shadow-2xl">

              <h2 className="text-white text-xl font-bold mb-5">
                Quick Overview
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between items-center">

                  <span className="text-white/80">
                    Orders
                  </span>

                  <span className="text-white font-bold text-xl">
                    {orders.length}
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-white/80">
                    Recent Status
                  </span>

                  <span className="text-green-300 font-bold">
                    {
                      orders.length > 0
                        ? orders[0].orderStatus
                        : "No Orders"
                    }
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-white/80">
                    Saved Address
                  </span>

                  <span className="text-green-300 font-bold">
                    Available
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

        {/* 🔥 ACTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">

          {/* CARD 1 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition duration-500 border border-gray-100 group hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6 group-hover:scale-110 transition">

              <span className="text-3xl">🛒</span>

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              My Cart
            </h2>

            <p className="text-gray-500 mb-6 leading-relaxed">
              Review your premium saree selections and proceed to secure checkout.
            </p>

            <button
              onClick={() => navigate('/cart')}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Open Cart
            </button>

          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition duration-500 border border-gray-100 group hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition">

              <span className="text-3xl">📦</span>

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              My Orders
            </h2>

            <p className="text-gray-500 mb-6 leading-relaxed">
              Track all your purchases and monitor delivery updates in real-time.
            </p>

            <button
              onClick={() => navigate('/my-orders')}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition"
            >
              View Orders
            </button>

          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition duration-500 border border-gray-100 group hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center mb-6 group-hover:scale-110 transition">

              <span className="text-3xl">📍</span>

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Address
            </h2>

            <p className="text-gray-500 mb-6 leading-relaxed">
              Manage and update your delivery address for seamless shopping.
            </p>

            <button
              onClick={() => navigate('/add-address')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Manage Address
            </button>

          </div>

          {/* CARD 4 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition duration-500 border border-gray-100 group hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center mb-6 group-hover:scale-110 transition">

              <span className="text-3xl">🚪</span>

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Logout
            </h2>

            <p className="text-gray-500 mb-6 leading-relaxed">
              Securely logout from your account anytime with one click.
            </p>

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-gray-700 to-black text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Logout
            </button>

          </div>

        </div>

        {/* 🔥 RECENT ORDERS */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 mb-14">

          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">

            <div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Recent Orders
              </h2>

              <p className="text-gray-500">
                Your latest luxury saree purchases
              </p>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => navigate('/')}
                className="bg-pink-100 text-pink-600 px-6 py-3 rounded-2xl font-semibold hover:bg-pink-200 transition"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => navigate('/my-orders')}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
              >
                View All Orders
              </button>

            </div>

          </div>

          {
            loading ? (

              <div className="py-24 text-center text-2xl font-semibold text-gray-400">
                Loading Orders...
              </div>

            ) : orders.length === 0 ? (

              <div className="border-2 border-dashed border-gray-200 rounded-[2rem] py-20 flex flex-col items-center justify-center text-center bg-gray-50">

                <div className="text-7xl mb-6">
                  ✨
                </div>

                <h3 className="text-3xl font-bold text-gray-700 mb-4">
                  No Recent Orders Yet
                </h3>

                <p className="text-gray-500 max-w-xl leading-relaxed text-lg">
                  Start exploring our luxurious saree collections and your orders
                  will appear beautifully here.
                </p>

                <button
                  onClick={() => navigate('/')}
                  className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition"
                >
                  Explore Sarees
                </button>

              </div>

            ) : (

              <div className="grid lg:grid-cols-2 gap-8">

                {
                  orders.slice(0, 4).map(order => (

                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-[2rem] p-6 hover:shadow-2xl transition duration-500 bg-gradient-to-br from-white to-pink-50"
                    >

                      <div className="flex justify-between items-center mb-5">

                        <div>

                          <h3 className="text-2xl font-bold text-gray-800">
                            Order #{order.id}
                          </h3>

                          <p className="text-gray-500 mt-1">
                            {
                              new Date(
                                order.orderedAt
                              ).toLocaleString()
                            }
                          </p>

                        </div>

                        <span className={`
                          px-4 py-2 rounded-full text-sm font-bold

                          ${
                            order.orderStatus === "DELIVERED"
                              ? "bg-green-100 text-green-600"
                              : order.orderStatus === "CANCELLED"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}>

                          {order.orderStatus}

                        </span>

                      </div>

                      <div className="space-y-4">

                        {
                          order.orderItems?.slice(0, 2).map(item => (

                            <div
                              key={item.id}
                              className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100"
                            >

                              <img
                                src={item.saree.imageUrl}
                                alt={item.saree.name}
                                className="w-20 h-20 rounded-2xl object-cover"
                              />

                              <div className="flex-1">

                                <h4 className="font-bold text-gray-800 text-lg">
                                  {item.saree.name}
                                </h4>

                                <p className="text-gray-500 text-sm mt-1">
                                  Quantity:
                                  <span className="font-semibold ml-2">
                                    {item.quantity}
                                  </span>
                                </p>

                                <p className="text-pink-600 font-bold text-lg mt-2">
                                  ₹ {item.price}
                                </p>

                              </div>

                            </div>

                          ))
                        }

                      </div>

                      <div className="mt-6 flex justify-between items-center">

                        <div>

                          <p className="text-gray-500 text-sm">
                            Total Amount
                          </p>

                          <h2 className="text-3xl font-black text-gray-800">
                            ₹ {order.totalAmount}
                          </h2>

                        </div>

                        <button
                          onClick={() => navigate('/my-orders')}
                          className="bg-black text-white px-5 py-3 rounded-2xl font-semibold hover:scale-105 transition"
                        >
                          Details
                        </button>

                      </div>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;