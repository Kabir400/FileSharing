import React from "react";
import HeroSection from "./components/HeroSection.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FileShare from "./components/FileShare.jsx";

function App() {
  console.log(import.meta.env.VITE_SOME_KEY);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/file/:id" element={<FileShare />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
