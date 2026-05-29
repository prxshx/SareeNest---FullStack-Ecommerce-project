import React, { useState } from "react";
import { login } from "../Services/authservice";
import { saveToken, getRoles } from "../Util/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(data);

      const token = res.data;
      console.log(token)
        if (!token || token === "undefined") {
        alert("Login failed: No token received, please try again");
        return;
      }
      saveToken(token);

      const roles = getRoles();

      if (roles && roles.includes("ROLE_ADMIN")) {
        navigate("/addProduct");
      } else {
        navigate("/user-dashboard");
      }

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-rose-100 to-yellow-100">

      {/* Card */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Saree Store Login
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please login to continue 🛍️
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
          onClick={handleLogin}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
        >
          Login
        </button>

        {/* Divider */}
        <div className="text-center mt-6 text-gray-400">
          — OR —
        </div>

        {/* Register Link */}
        <p className="text-center mt-4 text-sm">
          New to our store?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-pink-600 font-semibold cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;





// import React, { useState } from "react";
// import { login } from "../Services/authservice";
// import { saveToken, getRoles } from "../Util/auth";
// import { useNavigate } from "react-router-dom";

// const Login = () => {

//   const [data, setData] = useState({ username: "", password: "" });
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await login(data);

//       const token = res.data.token;
//       saveToken(token);
//       const roles = getRoles();

//       if (roles && roles.includes("ROLE_ADMIN")) {
//         navigate("/addProduct");
//       } else {
//         navigate("/user-dashboard");
//       }

//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) => setData({ ...data, username: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setData({ ...data, password: e.target.value })}
//       />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;