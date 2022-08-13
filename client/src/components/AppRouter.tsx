import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat, Home } from "../pages";
import { ForgotPassword } from "../pages/ForgotPassword";
import Login from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
