import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat.js";
import Home from "./components/Home/Home.js";
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
