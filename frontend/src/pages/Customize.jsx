import React, { useRef, useContext } from "react";
import StarrySky from "../components/StarrySky";
import Card from "../components/Card";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import { LuImageUp } from "react-icons/lu";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Customize() {
  const inputImage = useRef();

  const {
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const navigate = useNavigate();

  const handleImage = (event) => {
    const file = event.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  return (
    <div className="relative min-w-[150px] w-full h-[100vh] flex flex-col items-center justify-between p-5 overflow-hidden">
      {/* Background */}
      <StarrySky />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>

      {/* Header */}
      <div className="relative z-11 text-center mt-10">
        <h1 className="text-white text-[32px] md:text-[36px] font-bold drop-shadow-md">
          Choose your <span className="text-blue-400">Assistant Image</span>
        </h1>
        <p className="text-gray-300 text-[16px] mt-3 max-w-[600px] mx-auto leading-relaxed">
          Select a default avatar or upload your own to personalize your
          assistant. This image will represent your assistant throughout the
          app.
        </p>
      </div>

      {/* Cards Section */}
      <div className="relative z-10 w-full max-w-[900px] flex justify-center items-center flex-wrap gap-6 mt-8">
        <Card image={img2} />
        <Card image={img3} />
        <Card image={img4} />

        {/* Upload Option */}
        <div
          className={`w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-white/10 backdrop-blur-xl border border-white/20
            rounded-full overflow-hidden shadow-lg hover:scale-105 
            transition-transform duration-300 ease-in-out cursor-pointer flex flex-col justify-center items-center gap-2
            ${
              selectedImage === "input"
                ? "border-4 border-blue-400 shadow-2xl"
                : ""
            }`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {/* Hidden Input */}
          <input
            type="file"
            id="upload-avatar"
            accept="image/*"
            className="hidden"
            ref={inputImage}
            onChange={handleImage}
          />

          {/* Upload Label */}
          <label
            htmlFor="upload-avatar"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            {!frontendImage && (
              <>
                <LuImageUp className="w-[28px] h-[28px] text-white/80" />
                <span className="text-xs md:text-sm text-gray-200">Upload</span>
              </>
            )}
            {frontendImage && (
              <img
                src={frontendImage}
                className="w-full h-full object-cover"
                alt="Uploaded Preview"
              />
            )}
          </label>
        </div>
      </div>

      {/* Info Section */}
      <div className="relative z-10 text-center mt-8">
        <h2 className="text-white text-[22px] font-semibold">
          Make it personal ✨
        </h2>
        <p className="text-gray-400 text-[15px] max-w-[500px] mx-auto mt-2 leading-relaxed">
          A personalized assistant makes your experience unique. Choose an image
          that best reflects the assistant’s personality — calming,
          professional, or fun!
        </p>
      </div>

      {/* Next Button */}
      <div
        className={`relative z-10 flex gap-4 mb-10 mt-6 transition-all duration-500
          ${
            selectedImage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5 pointer-events-none"
          }`}
      >
        <button
          className="min-w-[160px] h-[45px] px-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-full text-lg shadow-md hover:shadow-xl hover:scale-105 transition"
          onClick={() => {
            navigate("/customize2");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Customize;
