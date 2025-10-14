🧥 WTWR — What To Wear?

A weather-based clothing recommendation app built with React.
It fetches real-time weather data and suggests clothing items based on temperature and conditions.

📌 About the Project

WTWR (What To Wear?) helps users decide what to wear based on the day’s weather.
It retrieves live weather data using the OpenWeather API, categorizes the temperature into hot, warm, or cold, and displays relevant clothing recommendations.

🎨 Design Reference

Figma: Sprint 10: WTWR Design

🚀 Features

• 🌤 Real-Time Weather: Fetches current data by latitude & longitude.
• 👕 Smart Recommendations: Displays clothing items filtered by weather type.
• 🧾 Item Management: Add, preview, and delete clothing items via modals.
• 🪟 Responsive UI: Works seamlessly on both desktop and mobile.
• ⚙️ API Integration: Uses JSON Server and OpenWeather for mock + live data.

🛠️ Tech Stack
Category	Tools
Frontend Framework • React (Functional Components, Hooks, Context API)
Styling •	CSS3, Flexbox, Grid, BEM Methodology
Language • JavaScript (ES6+)
Build Tool • Vite
API Services • JSON Server (Mock API), OpenWeather API

🧩 Project Structure
📂 src/
```
 ┣ 📁 components/        → Header, Main, Footer, Modals, Profile, etc.
 ┣ 📁 contexts/          → React Context for temperature unit
 ┣ 📁 hooks/             → Custom React hooks (useForm)
 ┣ 📁 utils/             → Constants, weatherApi.js, api.js
 ┣ 📁 vendor/            → normalize.css and fonts
 ┣ 📁 assets/            → Font and image assets
 ┣ 📁 images/            → Icons and weather images
 ┣ 📄 index.css          → Global styles
 ┗ 📄 main.jsx           → Application entry point
 ```

⚙️ Setup your own WTWR

1. Clone the repository
git clone https://github.com/<your-username>/se_project_react.git
cd se_project_react

2. Install dependencies
npm install

3. Start JSON Server (for db.json)
npx json-server --watch db.json --port 3001

4. Start the development server
npm run dev

5. Open the app

Visit http://localhost:5173 in your browser.