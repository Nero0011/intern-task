import React from "react";
import "./App.css";
import DarkMode from "./components/darkMode/DarkMode.tsx";
import Navbar from "./components/navbar/Navbar";
import useLocalStorage from 'use-local-storage';

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  return (
    <div className='App' data-theme={theme}>
      <DarkMode />
      <div>
        <Navbar />
      </div>
    </div>
  );
}

export default App
