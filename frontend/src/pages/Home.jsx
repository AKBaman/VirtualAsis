import React, { useContext } from "react";
import StarrySky from "../components/StarrySky";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";

function Home() {
  const { userData, serverUrl, setUserData,getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log("logout error: ", error);
    }
  };

  //helper for text to speech
  const speak = (text,speed =1.8) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speed
    window.speechSynthesis.speak(utterance);
  }

  //handle command function
  const handleCommand = (data)=>{
    const {type,userInput,response} = data;
    speak(response);

    if(type == 'google_serach'){
      const query = encodeURIComponent(userInput);
      //to be completed
    }
  }
  //Helper for listening and speech to text conversion

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en_US'

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length-1][0].transcript.trim()
      console.log("heard:" ,transcript)

      if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
        const data = await getGeminiResponse(transcript)
        console.log(data);
        speak(data.response);
      }
    }
    recognition.start();

    
  },[])


  
  // Helper for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };


  return (
    <div className="relative min-w-[150px] w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <StarrySky />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>

      {/* Logout Button */}
      <div
        className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 cursor-pointer rounded-xl bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition z-20"
        onClick={handleLogout}
      >
        <MdOutlineLogout className="w-5 h-5" />
        <span>Logout</span>
      </div>

      {/* Greeting */}
      <div className="relative z-10 text-center mb-6">
        <h2 className="text-white/90 text-lg md:text-xl font-light tracking-wide">
          {getGreeting()}, {userData?.username || "there"} 👋
        </h2>
        <h1 className="text-white text-3xl md:text-4xl font-bold mt-2">
          Welcome back to your{" "}
          <span className="text-blue-400">Assistant</span>
        </h1>
      </div>

      {/* Assistant Card */}
      <div className="relative z-10 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 flex flex-col items-center gap-4 shadow-xl w-[90%] max-w-[400px] text-center animate-fade-in">
        {/* Assistant Avatar */}
        <img
          src={userData?.assistantImage}
          alt="Assistant"
          className="w-32 h-32 rounded-full object-cover border-2 border-white/30 shadow-md"
        />
        {/* Assistant Name */}
        <h1 className="text-white text-2xl font-semibold">
          I'm {userData?.assistantName || "Your Assistant"}
        </h1>
        <p className="text-gray-300 text-sm max-w-[300px]">
          Ready to help you with tasks, ideas, and anything you need. Let’s
          start exploring together!
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full mt-4">
          <button
            className="w-full py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-md"
            onClick={() => {
              // navigate("/chat");
              speak("Speech Ready,Hurry up");
            }}
          >
            Talk to {userData?.assistantName || "Assistant"}
          </button>
          <button
            className="w-full py-2 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition"
            onClick={() => {
              navigate("/customize");
            }}
          >
            Customize {userData?.assistantName || "Assistant"}
          </button>
          
          {/* <button
            className="w-full py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition"
            onClick={() => {
              navigate("/profile");
            }}
          >
            View Profile
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
