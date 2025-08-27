import React, { useContext, useState } from "react";
import StarrySky from "../components/StarrySky";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { serverUrl, setUserData } = useContext(userDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setUserData(null);
      setErr(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[100vh] flex justify-center items-center overflow-hidden">
      <StarrySky />

      {/* Overlay for gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>

      {/* Main Sign In Card */}
      <form
        className="relative z-10 w-[60%] h-[550px] max-w-[500px] bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col items-center justify-center gap-6 px-8 rounded-2xl animate-fadeIn"
        onSubmit={handleSignIn}
      >
        <h1 className="text-white text-3xl font-bold mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-gray-300 text-center mb-6 text-[16px]">
          Sign in to your{" "}
          <span className="text-blue-400 font-semibold">
            Virtual Assistant
          </span>{" "}
          dashboard and continue where you left off.
        </p>

        {/* Email Input */}
        <input
          type="email"
          id="emailBox"
          placeholder="Email"
          className="w-full h-[50px] outline-none border border-white/40 text-white bg-transparent placeholder-gray-300 px-5 rounded-full text-lg focus:border-blue-400 transition"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        {/* Password Input */}
        <div className="w-full h-[50px] border border-white/40 bg-transparent text-white rounded-full text-lg relative focus-within:border-blue-400 transition">
          <input
            type={showPassword ? "text" : "password"}
            id="passwordBox"
            placeholder="Enter Password"
            className="w-full h-full outline-none bg-transparent placeholder-gray-300 px-5 rounded-full text-lg"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && (
            <IoEye
              className="absolute top-3.5 right-5 w-5 h-5 text-white cursor-pointer hover:scale-110 transition"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoEyeOff
              className="absolute top-3.5 right-5 w-5 h-5 text-white cursor-pointer hover:scale-110 transition"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {/* Error Message */}
        {err.length > 0 && (
          <p className="text-red-400 text-[15px] italic">⚠ {err}</p>
        )}

        {/* Submit Button */}
        <button
          className="min-w-[120px] h-[45px] bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full text-lg mt-4 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        {/* Signup Link */}
        <p
          className="text-gray-200 text-[16px] cursor-pointer hover:text-blue-400 transition"
          onClick={() => navigate("/signup")}
        >
          Don’t have an account?{" "}
          <span className="text-blue-400 font-semibold">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
