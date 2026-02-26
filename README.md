# 🧥 WTWR — What To Wear?

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Project-Complete-brightgreen)

🎥 [**Watch Project Pitch (Click!)**](https://drive.google.com/file/d/12tSrhbzfOoDGeTcuvFfMrZ7QL0BnNA0d/view?usp=sharing)

A weather-based clothing recommendation app built with React.  
It fetches real-time weather data and suggests clothing items based on temperature and conditions.

---

## 📌 About the Project

WTWR (What To Wear?) helps users decide what to wear based on the day’s weather.  
It retrieves live weather data using the OpenWeather API, categorizes the temperature into **hot**, **warm**, or **cold**, and displays relevant clothing recommendations.

---

## 🎨 Design Reference

**Figma:** [Sprint 11: WTWR Design](https://www.figma.com/design/dQLJwEKasIdspciJAJrCaf/Sprint-11_-WTWR?node-id=311-433&t=DCTuwMrtagL4uoFg-1)

---

## 🔌 Backend Repository

**Backend GitHub Repository:**  
[se_project_express](https://github.com/Nilyok/se_project_express)

The backend API must be running for this application to function. Ensure the repository is public and follow the backend setup instructions.

---

## �🚀 Features

```bash
- 🌤 **Real-Time Weather:** Fetches current data by latitude & longitude
- 👕 **Smart Recommendations:** Displays clothing items filtered by weather type
- 🧾 **Item Management:** Add, preview, and delete clothing items via modals
- 🪟 **Responsive UI:** Works seamlessly on both desktop and mobile
- ⚙️ **API Integration:** Uses JSON Server and OpenWeather for mock + live data
```

---

## 🛠️ Tech Stack

| Category               | Tools                                             |
| ---------------------- | ------------------------------------------------- |
| **Frontend Framework** | React (Functional Components, Hooks, Context API) |
| **Styling**            | CSS3, Flexbox, Grid, BEM Methodology              |
| **Language**           | JavaScript (ES6+)                                 |
| **Build Tool**         | Vite                                              |
| **API Services**       | JSON Server (Mock API), OpenWeather API           |

---

## 🧩 Project Structure

```bash
📂 src/
 ┣ 📁 components/        → Header, Main, Footer, Modals, Profile, etc.
 ┣ 📁 contexts/          → React Context for temperature unit
 ┣ 📁 hooks/             → Custom React hooks (useForm)
 ┣ 📁 utils/             → Constants, weatherApi.js, api.js
 ┣ 📁 vendor/            → normalize.css and fonts
 ┣ 📁 assets/            → Font and image assets
 ┣ 📁 images/            → Icons and weather images
 ┣ 📄 index.css          → Global styles
 ┗ 📄 main.jsx           → Application entry point

---
```
