import React, { useState } from "react";
import { register } from "../Services/authservice";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(data);
      alert("Registered successfully");

      // redirect to login after register
      navigate("/login");

    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-rose-100 to-yellow-100">

      {/* Card */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Create Your Account
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 mb-6">
          Join our saree store and start shopping 🛍️
        </p>

        {/* Username */}
        <input
          placeholder="Username"
          className="w-full px-4 py-3 mb-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-6 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
        >
          Register
        </button>

        {/* Divider */}
        <div className="text-center mt-6 text-gray-400">
          — OR —
        </div>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { register } from "../Services/authservice";

// const Register = () => {

//   const [data, setData] = useState({ username: "", password: "" });

//   const handleRegister = async () => {
//     try {
//       await register(data);
//       alert("Registered successfully");
//     } catch (err) {
//       alert("Error");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) => setData({ ...data, username: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setData({ ...data, password: e.target.value })}
//       />

//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// };

// export default Register;