import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Join from "./components/Home/Join";
import "./style.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
