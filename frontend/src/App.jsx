import Navbar from './components/Navbar.jsx';
import HomePage from "./pages/Home.jsx"
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from "./pages/SignUp.jsx";
import LoginPage from "./pages/Login.jsx";
import Profile from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore.js';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';

const App = () => {

   const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

   const { theme } = useThemeStore();

   console.log(onlineUsers);
   
   useEffect(() => {
      checkAuth();
   }, [checkAuth]);

    useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

   console.log({authUser});

   if(isCheckingAuth && !authUser) {
      return (
     <div className='flex h-screen justify-center items-center'>
      <Loader className="size-10 animate-spin " />
     </div>
      )
   }

  return (
    <div>
      <Navbar />
    

      <Routes>

        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage />:  <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={ authUser ? <Profile />:  <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage />} />
      
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;