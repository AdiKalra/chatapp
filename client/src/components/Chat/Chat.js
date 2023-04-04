import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import "./Chat.css";

let socket;
export default function Chat(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const location = useLocation();
  const ENDPOINT = "localhost:8000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (error) => {
      // console.log(error);
      // throw new Error(error);
      console.error(error);
    });
    // eslint-disable-next-line
  }, [ENDPOINT, location.search]);
  return <div>Chat</div>;
}
