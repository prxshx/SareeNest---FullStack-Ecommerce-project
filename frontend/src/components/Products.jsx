import React, { useContext, useState, useEffect } from 'react';
import { ProductsContext } from '../Context/ProductsProvider';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Services/api';
import { logout } from '../Util/auth';

const Products = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [error, setError] = useState(false);

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  // 🔥 ORDERS STATE
  const [orders, setOrders] = useState([]);

  const [ordersLoading, setOrdersLoading] = useState(true);

  const {
    products,
    setProducts,
    product,
    setProduct,
    image,
    setImage
  } = useContext(ProductsContext);

  // 🔥 FETCH PRODUCT
  useEffect(() => {

    if (!id) return;

    const fetchProduct = async () => {

      try {

        const res = await fetch(
          `http://localhost:8080/saree/getSareeById/${id}`
        );

        if (res.ok) {

          const data = await res.json();

          setProduct(data);
        }

      } catch (err) {

        setError(true);
      }
    };

    fetchProduct();

  }, [id, setProduct]);

  // 🔥 FETCH ORDERS
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const response = await api.get(
          "/admin/orders/all-orders"
        );

        setOrders(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setOrdersLoading(false);
      }
    };

    fetchOrders();

  }, []);

  // 🔥 UPDATE ORDER STATUS
  const updateOrderStatus = async (
    orderId,
    status
  ) => {

    try {

      await api.put(
        `/admin/orders/update-status/${orderId}`,
        { status }
      );

      setOrders(prev =>
        prev.map(order =>

          order.id === orderId
            ? { ...order, orderStatus: status }
            : order
        )
      );

    } catch (error) {

      console.log(error);

      alert("Failed to update order");
    }
  };

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 IMAGE
  const handleImage = (e) => {

    setImage(e.target.files[0]);
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError(false);

    setSuccess(false);

    setLoading(true);

    const form = new FormData();

    form.append("name", product.name);

    form.append("desc", product.desc);

    form.append("price", product.price);

    form.append("category", product.category);

    form.append("quantity", product.quantity);

    form.append(
      "isAvailable",
      product.isAvailable === "true"
    );

    if (image) {
      form.append("image", image);
    }

    try {

      let response;

      if (id) {

        response = await api.put(
          `/saree/update/${id}`,
          form
        );

      } else {

        response = await api.post(
          `/saree/addSaree`,
          form
        );
      }

      const data = response.data;

      if (id) {

        setProducts(prev =>
          prev.map(item =>
            item.id == id ? data : item
          )
        );

      } else {

        setProducts(prev => [...prev, data]);
      }

      setSuccess(true);

      setProduct({
        name: "",
        desc: "",
        price: "",
        category: "",
        quantity: "",
        isAvailable: ""
      });

      setImage(null);

      if (id) {

        setTimeout(() => {

          navigate("/update/delete");

        }, 1000);
      }

    } catch (err) {

      setError(true);
    }

    setLoading(false);
  };

  const handleEdit = () => {

    navigate("/update/delete");
  };

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-180px] left-[-180px] w-[500px] h-[500px] bg-pink-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-purple-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute top-[40%] left-[45%] w-[350px] h-[350px] bg-blue-500/10 blur-[140px] rounded-full"></div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* HERO */}
        <div className="bg-white/[0.04] border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 shadow-[0_25px_80px_rgba(0,0,0,0.45)] mb-12">

          <div className="flex flex-col xl:flex-row justify-between gap-10">

            {/* LEFT */}
            <div>

              <p className="uppercase tracking-[0.35em] text-pink-400 text-sm mb-5 font-semibold">
                SareeNest Admin Portal
              </p>

              <h1 className="text-6xl font-black leading-[1.1] bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent mb-6">

                Luxury Store
                <br />
                Management

              </h1>

              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                Manage products, orders, delivery flow and
                premium customer experience.
              </p>

            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-5 min-w-[320px]">

              <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 shadow-[0_15px_50px_rgba(236,72,153,0.35)]">

                <div className="text-4xl mb-4">
                  🛍️
                </div>

                <h2 className="text-xl font-bold mb-2">
                  Products
                </h2>

                <p className="text-4xl font-black">
                  {products.length}
                </p>

              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-6">

                <div className="text-4xl mb-4">
                  📦
                </div>

                <h2 className="text-xl font-bold mb-2">
                  Orders
                </h2>

                <p className="text-4xl font-black">
                  {orders.length}
                </p>

              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

                <div className="text-4xl mb-4">
                  🚚
                </div>

                <h2 className="text-xl font-bold mb-2">
                  Delivered
                </h2>

                <p className="text-4xl font-black text-green-400">

                  {
                    orders.filter(
                      o => o.orderStatus === "DELIVERED"
                    ).length
                  }

                </p>

              </div>

              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl p-6 shadow-[0_15px_50px_rgba(99,102,241,0.35)]">

                <div className="text-4xl mb-4">
                  💰
                </div>

                <h2 className="text-xl font-bold mb-2">
                  Revenue
                </h2>

                <p className="text-2xl font-black">

                  ₹ {
                    orders.reduce(
                      (acc, order) =>
                        acc + order.totalAmount,
                      0
                    )
                  }

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white/[0.04] border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">

            <div>

              <h2 className="text-5xl font-black mb-3">

                {
                  id
                    ? "Update Product"
                    : "Add New Saree"
                }

              </h2>

              <p className="text-gray-400 text-lg">
                Fill luxury product details carefully
              </p>

            </div>

            <div className="flex gap-4 flex-wrap">

              <button
                onClick={handleEdit}
                className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 rounded-2xl font-semibold hover:scale-105 active:scale-95 transition"
              >
                Manage Products
              </button>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-4 rounded-2xl font-semibold hover:scale-105 active:scale-95 transition"
              >
                Logout
              </button>

            </div>

          </div>

          {/* SUCCESS */}
          {
            success && (

              <div className="bg-green-500/10 border border-green-500/20 text-green-300 px-6 py-5 rounded-2xl mb-8 text-lg font-semibold">

                {
                  id
                    ? "Product updated successfully ✅"
                    : "Product added successfully ✅"
                }

              </div>
            )
          }

          {/* ERROR */}
          {
            error && (

              <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-5 rounded-2xl mb-8 text-lg font-semibold">
                Something went wrong ❌
              </div>
            )
          }

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-10"
          >

            <div className="grid md:grid-cols-2 gap-8">

              <input
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-pink-500"
              />

              <input
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-pink-500"
              />

              <input
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-pink-500"
              />

              <input
                name="quantity"
                type="number"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-pink-500"
              />

            </div>

            <textarea
              rows="5"
              name="desc"
              value={product.desc}
              onChange={handleChange}
              placeholder="Description"
              required
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 outline-none focus:border-pink-500 resize-none"
            />

            <div className="grid md:grid-cols-2 gap-8">

              <select
                name="isAvailable"
                value={product.isAvailable}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-pink-500"
              >

                <option value="" className="bg-[#111]">
                  Select Availability
                </option>

                <option value="true" className="bg-[#111]">
                  Available
                </option>

                <option value="false" className="bg-[#111]">
                  Out Of Stock
                </option>

              </select>

              <div className="bg-white/5 border border-dashed border-white/20 rounded-3xl p-6">

                <input
                  type="file"
                  onChange={handleImage}
                  className="w-full text-gray-300 file:bg-pink-500 file:border-none file:text-white file:px-5 file:py-3 file:rounded-xl file:mr-5"
                />

              </div>

            </div>

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className={`px-12 py-5 rounded-2xl text-xl font-bold transition duration-300 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:scale-105 active:scale-95"
                }`}
              >

                {
                  loading
                    ? (
                      id
                        ? "Updating..."
                        : "Adding..."
                    )
                    : (
                      id
                        ? "Update Product"
                        : "Add Product"
                    )
                }

              </button>

            </div>

          </form>

        </div>

        {/* 🔥 ORDERS SECTION */}
        <div className="mt-14 space-y-8">

          <div>

            <h1 className="text-5xl font-black bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent mb-3">
              Orders Management
            </h1>

            <p className="text-gray-400 text-lg">
              Manage customer orders & delivery flow
            </p>

          </div>

          {
            ordersLoading ? (

              <div className="text-center text-2xl text-gray-400 py-20">
                Loading Orders...
              </div>

            ) : orders.length === 0 ? (

              <div className="text-center text-2xl text-gray-400 py-20">
                No Orders Found
              </div>

            ) : (

              orders.map(order => (

                <div
                  key={order.id}
                  className="bg-white/[0.04] border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl shadow-[0_15px_60px_rgba(0,0,0,0.35)]"
                >

                  <div className="flex flex-col xl:flex-row justify-between gap-10">

                    {/* LEFT */}
                    <div className="flex-1">

                      <div className="flex items-center gap-4 mb-5">

                        <h2 className="text-3xl font-black">
                          Order #{order.id}
                        </h2>

                        <span className={`
                          px-4 py-2 rounded-full text-sm font-bold

                          ${
                            order.orderStatus === "DELIVERED"
                              ? "bg-green-500/20 text-green-300"
                              : order.orderStatus === "CANCELLED"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }
                        `}>

                          {order.orderStatus}

                        </span>

                      </div>

                      <p className="text-gray-400 mb-2">
                        Payment ID:
                        <span className="text-white ml-2">
                          {order.paymentId}
                        </span>
                      </p>

                      <p className="text-gray-400 mb-5">
                        Ordered At:
                        <span className="text-white ml-2">
                          {
                            new Date(
                              order.orderedAt
                            ).toLocaleString()
                          }
                        </span>
                      </p>

                      {/* ADDRESS */}
                      {
                        order.address && (

                          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">

                            <h3 className="font-bold text-lg mb-3">
                              Delivery Address
                            </h3>

                            <p className="text-gray-300">
                              {order.address.address}
                            </p>

                            <p className="text-gray-400 mt-1">
                              {order.address.district},
                              {" "}
                              {order.address.state}
                              {" - "}
                              {order.address.pinCode}
                            </p>

                          </div>
                        )
                      }

                      {/* ITEMS */}
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {
                          order.orderItems?.map(item => (

                            <div
                              key={item.id}
                              className="bg-white/5 border border-white/10 rounded-3xl p-4 flex gap-4"
                            >

                              <img
                                src={item.saree.imageUrl}
                                alt={item.saree.name}
                                className="w-24 h-24 rounded-2xl object-cover"
                              />

                              <div className="flex-1">

                                <h4 className="font-bold text-lg mb-2">
                                  {item.saree.name}
                                </h4>

                                <p className="text-gray-400 text-sm mb-1">
                                  Qty:
                                  <span className="text-white ml-2">
                                    {item.quantity}
                                  </span>
                                </p>

                                <p className="text-pink-300 font-bold text-lg">
                                  ₹ {item.price}
                                </p>

                              </div>

                            </div>

                          ))
                        }

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="min-w-[300px]">

                      <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-8 shadow-[0_15px_40px_rgba(236,72,153,0.35)]">

                        <p className="text-pink-100 mb-2">
                          Total Amount
                        </p>

                        <h1 className="text-5xl font-black">
                          ₹ {order.totalAmount}
                        </h1>

                      </div>

                      <div className="mt-6">

                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value
                            )
                          }
                          className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
                        >

                          <option value="PLACED" className="bg-[#111]">
                            PLACED
                          </option>

                          <option value="PACKED" className="bg-[#111]">
                            PACKED
                          </option>

                          <option value="SHIPPED" className="bg-[#111]">
                            SHIPPED
                          </option>

                          <option value="OUT_FOR_DELIVERY" className="bg-[#111]">
                            OUT FOR DELIVERY
                          </option>

                          <option value="DELIVERED" className="bg-[#111]">
                            DELIVERED
                          </option>

                          <option value="CANCELLED" className="bg-[#111]">
                            CANCELLED
                          </option>

                        </select>

                      </div>

                    </div>

                  </div>

                </div>

              ))
            )
          }

        </div>

      </div>

    </div>
  );
};

export default Products;