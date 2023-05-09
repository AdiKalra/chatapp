import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage";
import Chat from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="api/chat/"  element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
