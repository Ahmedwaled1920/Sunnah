import React from "react";
import { Route, Routes } from "react-router-dom";
import { Forget, Home, LoadingPage, Login, Phone, SignUp } from "./pages";
import Dashboard from "./dashboard/Dashboard";
import ChatParent from "./dashboard/Chat/ChatParent";
import SubAdminManagement from "./dashboard/subadmin/FormSubAdmin";
import PersonalChat from "./dashboard/Chat/PersonalChat";
import Chat from "./dashboard/Chat/Chat";

const App = () => {
  return (
    <div dir="rtl">
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatParent />} />
        <Route path="/subadmin" element={<SubAdminManagement />} />
    
      </Routes>
    </div>
  );
};

export default App;
