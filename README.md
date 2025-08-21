#  Real-Time Chat App  
![Chat App Banner](https://github.com/user-attachments/assets/2577666b-eaf8-46d3-b7c7-a7c63fa75f86)

## 🛠️ Installation & Local Setup

**Monorepo layout:** `backend/` (Express + Socket.IO) and `frontend/` (React + DaisyUI).  
**Root scripts used:**
- `build`: `npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend`
- `start`: `npm run start --prefix backend`

### 1) Clone the repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

## 2) Environment variables

Tip: Never commit real secrets. Use .env in your .gitignore.

Create the following files with your own values.
|![backend/.env](https://github.com/user-attachments/assets/d4fc0f92-5d14-4ad3-8d73-9a9ef2967292)|

## 3) Install dependencies and build the frontend
   
 Run from the project root:
|![frontend/.env](https://github.com/user-attachments/assets/487add1e-acdb-4473-b53f-74ee8565ae34)|

This:

Installs backend dependencies

Installs frontend dependencies

Builds the React app in frontend

## 4) Start the server
|![](https://github.com/user-attachments/assets/4be5829e-25f8-465a-a2b8-bd6d5c662428)|

## 5) Optional: run in dev mode (separate terminals)

If you prefer hot reload for both apps:
|![](https://github.com/user-attachments/assets/d91f1303-0c79-41d2-8adb-355b7014e131)|

## 6) Common checks

MongoDB: MONGODB_URL is valid and whitelisted on Atlas

CORS/Socket.IO: CLIENT_URL, VITE_API_URL, and VITE_SOCKET_URL point to the correct origins

Ports: PORT in backend/.env matches what you expect

## 7) Production deploy (quick reference)

Build command: npm run build

Start command: npm run start

Set the same environment variables on your host

Point your domain to the server running the backend

## ✨ Features  

- ⚡ **Real-time Messaging** — powered by Socket.IO for instant communication  
- 🔐 **Secure Authentication** — JWT-based login & sessions  
- 👥 **User Presence** — see who’s online/offline in real time  
- 📱 **Responsive Design** — DaisyUI + TailwindCSS for mobile-first experience  
- 💬 **One-to-One & Group Chats**  
- ⏳ **Typing Indicators & Message Timestamps**

## 📖 Benefits  

This project is a **real-time chat application** where users can:  
- 🔐 Register and log in securely  
- 💬 Send and receive messages instantly  
- 👥 Chat one-on-one or in groups  
- 🟢 See who’s online with live status updates  
- 🎨 Enjoy a clean and responsive UI powered by **DaisyUI + TailwindCSS**  

Built with **MERN (MongoDB, Express, React, Node.js)** and **Socket.IO** for seamless, low-latency communication.

## 🧩 Tech Stack
<p align="left"> <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,tailwind" /> <img src="https://skillicons.dev/icons?i=socketio" /> </p>

Frontend: React + DaisyUI + TailwindCSS

Backend: Node.js + Express

Database: MongoDB Atlas

Realtime: Socket.IO




## 📸 Screenshots  

|  Desktop view | Mobile View |
|-------------|-------------|
| ![Chat](https://github.com/user-attachments/assets/70b630a2-dd33-47ba-a1ad-682f39d7e48b) | ![Mobile](https://github.com/user-attachments/assets/18ba4da3-b325-4b01-9db0-1d52083c30df) |

|  Chat view | Profile View |
|-------------|-------------|
| ![](https://github.com/user-attachments/assets/e0e959c1-08d3-495a-9896-76b6b276e642) | ![](https://github.com/user-attachments/assets/d34631d0-3910-4d7d-a6a2-c6eaffcc0896) |


|  Theme view |
|-------------|
| ![Theme view](https://github.com/user-attachments/assets/7b4a9a4c-0006-4d05-a4d2-15b6859b346c) |

<img width="927" height="366" alt="image" src="https://github.com/user-attachments/assets/d0b281d3-f3ce-470c-852d-f5913a44f34c" />



🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch (feature/your-feature)

Commit your changes

Push and submit a PR

## Live Demo - https://fullstack-chat-app-mis6.onrender.com/













  








