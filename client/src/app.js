import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat.js";
import Join from "./components/Home/Join.js";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Join />} />
        <Route path="/api/chat"  element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
