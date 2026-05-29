import React, { useState } from "react";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("We received your message, our team will respond quicky, Thank you!")
    console.log("Contact Form Submitted:", formData);
    setFormData({ name: "",
    email: "",
    message: ""})
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 grid md:grid-cols-2 gap-10">

        {/* Left Side - Info */}
        <div>
          <h1 className="text-4xl font-bold text-pink-600 mb-6">
            Contact Us
          </h1>

          <p className="text-gray-600 mb-6">
            Have questions about our saree collections?  
            We’d love to hear from you. Reach out and our team will respond quickly.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📍 Chennai, Tamil Nadu, India</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@sareestore.com</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          ></textarea>

          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-2xl font-semibold text-lg shadow-md transition duration-300"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
};

export default Contact;