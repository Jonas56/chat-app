import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import expired from "./app/api/config";
import { logout } from "./app/redux/features/authSlice";
import { AppDispatch } from "./app/redux/store";
import { AppRouter } from "./components/AppRouter";

function App() {
  const [theme, setTheme] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (expired) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
