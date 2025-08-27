import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import { response } from "express";
import moment from "moment/moment.js";
export const getCurrentUser = async (req,res) => {
  try {
    const userId = req.userId;
    const user  = await User.findById(userId).select("-password")

    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    return res.status(200).json(user)

  } catch (error) {
    console.log("get current user error: ",error);
    return res.status(500).json({message:"Internal server error"})
  }
}

export const updateAssistant = async(req,res) => {
  console.log("BODY:", req.body);   // 👈 check if assistantName is here
  console.log("FILE:", req.file);   // 👈 check if file is coming
  try {
    const {assistantName,imageUrl} = req.body
    let assistantImage;

    if(req.file){
      assistantImage = await uploadOnCloudinary(req.file.path);
    }
    else{
      assistantImage = imageUrl
    }

    const user = await User.findByIdAndUpdate(req.userId,{assistantImage,assistantName},{new:true}).select("-password")

    return res.status(200).json(user)

  } catch (error) {
    return res.status(400).json({message:"update assistant error"})
  }
} 


export const askToAssistant  = async (req,res) => {
  try {
    const {command} = req.body;
    const user = await User.findById(req.userId);
    const userName  = user.name;
    const assistantName = user.assistantName;

    const result = await geminiResponse(command,assistantName,userName);
    
    const jsonMatch = result.match(/{[\s\S]*}/)

    if(!jsonMatch){
      return res.status(400).json({response:"Sorry i can't understand"})
    }
    const gemResult =JSON.parse(jsonMatch[0])
    
    const type = gemResult.type;

    switch(type){
      case "get_date": 
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`current date is ${moment().format("DD/MM/YYYY")}`
        });
      case "get_time" :
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`current time is ${moment().format("HH:mm A")}`
        });
        case "get_day" :
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`today is ${moment().format("dddd")}`
        });
        case "get_month" :
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`current month is ${moment().format("MMMM")}`
        });
        case 'google_search':
        case "youtube_search":
        case "youtube_play" :
        case "general":
        case "calculator_open":
        case "instagram_open" :
        case "facebook_open" :
        case "weather_show":
          return res.json({
            type,
            userInput:gemResult.userInput,
            response:gemResult.response,
          });

          default :
            return res.status(400).json({response: "I didn't understand that command."})
    }
  } catch (error) {
    return res.status(500).json({response: "ask assistant error"})
  }
}