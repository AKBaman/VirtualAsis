# 🗣️ Virtual Assistant  

A simple yet powerful **Virtual Assistant** built using **Node.js, JavaScript, and web APIs**. The assistant can understand user queries, manage tasks like fetching the current date/time, respond to greetings, provide news/weather updates, and even speak responses using the **Web Speech API**.  

---

## 🚀 Features  

- **Voice Interaction**: Uses Web Speech API (`speechSynthesis`) to respond.  
- **Text Commands**: Accepts text input for queries and tasks.  
- **Current Time & Date**: Fetches the system’s current day, date, month, and time (using `moment.js`).  
- **Session Management**: Explains **stateful vs stateless** servers, sessions, and cookies with examples.  
- **News Integration**: Fetches news using **NewsAPI** (with fallback strategies).  
- **Weather Updates**: Displays real-time weather information.  
- **Fallback Strategies**:  
  - Caches last successful API response.  
  - Works offline with **Service Workers**.  
  - Supports multiple providers to avoid downtime.  
- **Secure System Design**: JWT for authentication, bcrypt for password encryption, and token-based verification.  
- **Customizable**: Add new skills/commands easily by extending the logic.  

---

## 🛠️ Tech Stack  

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **APIs**:  
  - Web Speech API (for voice synthesis)  
  - Moment.js (for date/time formatting)  
  - NewsAPI (for latest news)  
  - OpenWeather API (for weather info)  
- **Storage**: LocalStorage / IndexedDB (for caching API responses)  
- **Security**: JWT & bcrypt for authentication  

---

## 📂 Project Structure  

```
virtual-assistant/
│── index.html        # Main frontend file
│── style.css         # Styling
│── script.js         # Core logic (voice, commands, APIs)
│── server.js         # Node.js backend server
│── package.json      # Project dependencies
│── /assets           # Icons, images, etc.


```

## ⚡ Setup & Installation  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/virtual-assistant.git
   cd virtual-assistant
   ```
2. **Install Dependencies**
   ```
   npm install
   ```
3. **Add Environment Variables**
   ```
   Create a .env file in the project root:
    NEWS_API_KEY=your_news_api_key
    WEATHER_API_KEY=your_weather_api_key
   
    ```
4.Run the Project
    ```
    npm start
    ```
## 🖥️ Usage

- Type or speak a query (like "What’s the time?" or "Show me today’s news")
- The assistant responds with text + voice.
- Works offline (limited mode) using cached data.
- Extend commands in script.js to add new functionality.

## 🔒 Security Features

- JWT Authentication: Ensures secure access to backend routes.
- Password Encryption: Uses bcrypt to hash passwords before storing in DB.
- Token Verification: Only authenticated requests get responses.

## 📌 Future Improvements
- Add Natural Language Processing (NLP) for smarter query handling.
- Improve speech recognition (currently only speech output).
- Multi-language support.
- Integration with Google Calendar & Email API for personal assistant tasks.
- Deploy on Vercel/Heroku for public access.

## 👨‍💻 Author

- Aman Kumar Batsh
