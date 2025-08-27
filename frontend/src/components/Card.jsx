import React, { useContext } from "react";
import { userDataContext } from "../context/userContext";

const Card = ({ image }) => {
  const {
    setBackendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  return (
    <div
      className={`
        relative w-[100px] h-[100px] lg:w-[150px] lg:h-[150px]
        rounded-2xl overflow-hidden cursor-pointer
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-md hover:shadow-2xl transition-all duration-300
        hover:scale-105 hover:border-blue-400
        ${
          selectedImage === image
            ? "border-4 border-blue-400 shadow-xl"
            : ""
        }
      `}
      onClick={() => {
        setSelectedImage(image);
        setBackendImage(null);
        setFrontendImage(null);
      }}
    >
      <img
        src={
          image ||
          "https://via.placeholder.com/220x320.png?text=No+Image"
        }
        alt="assistant-card"
        className="w-full h-full object-cover"
      />

      {/* Overlay for iOS-style glossy effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};

export default Card;
