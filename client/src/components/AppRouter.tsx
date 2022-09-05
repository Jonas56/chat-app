import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat, Home, ForgotPassword, SignIn, SignUp } from "../pages";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
