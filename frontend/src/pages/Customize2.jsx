import React, { useContext, useState } from "react";
import StarrySky from "../components/StarrySky";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    try {
      setLoading(true);
      setErr("");

      let formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );

      setUserData(result.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(`error occurred in handleUpdateAssistant : `, error);
      setErr("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-w-[150px] w-full h-[100vh] flex flex-col items-center justify-center p-5 overflow-hidden">
      {/* Background */}
      <StarrySky />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>

      {/* Back Button */}
      <MdKeyboardBackspace
        className="absolute top-6 left-6 w-[40px] h-[40px] p-2 cursor-pointer rounded-xl bg-white/20 text-white hover:bg-white/30 transition z-20"
        onClick={() => {
          navigate("/customize");
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center mt-6 flex flex-col items-center">
        <h1 className="text-white text-[32px] md:text-[36px] font-bold mb-6 drop-shadow-md">
          Give your <span className="text-blue-400">Assistant</span> a Name
        </h1>
        <p className="text-gray-300 text-[16px] mb-6 max-w-[600px] leading-relaxed">
          Choose a name to call your assistant. Whether it's friendly, formal,
          or fun, this name will make your experience more personal.
        </p>

        {/* Input */}
        <input
          type="text"
          id="nameBox"
          placeholder="e.g. Shifra"
          className="w-full max-w-[500px] h-[55px] outline-none border border-white/30 text-white bg-white/10 backdrop-blur-md placeholder-gray-400 px-5 rounded-full text-lg focus:border-blue-400 transition"
          onChange={(e) => {
            setAssistantName(e.target.value);
          }}
          value={assistantName}
          required
        />

        {/* Error message */}
        {err && <p className="text-red-500 mt-3 text-sm">*{err}</p>}
      </div>

      {/* Action Button */}
      <div
        className={`relative z-10 flex gap-4 mt-10 transition-all duration-500
          ${
            assistantName
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5 pointer-events-none"
          }`}
      >
        <button
          className="min-w-[180px] h-[48px] px-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-full text-lg shadow-md hover:shadow-xl hover:scale-105 transition"
          onClick={handleUpdateAssistant}
          disabled={loading}
        >
          {loading ? "Creating..." : "Finally Create Your Assistant"}
        </button>
      </div>
    </div>
  );
};

export default Customize2;
