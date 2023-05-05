import React, { useState, useEffect } from "react";
// import queryString from "query-string";
// import io from "socket.io-client";
// import { useLocation } from "react-router-dom";
import "./Chat.css";
import axios from "axios";

// let socket;
export default function Chat(props) {
  const [data, setData] = useState([]);
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");
  // const location = useLocation();
  // const ENDPOINT = "localhost:8000";
  // useEffect(() => {
  //   const { name, room } = queryString.parse(location.search);
  //   setName(name);
  //   setRoom(room);

  //   socket = io(ENDPOINT);
  //   socket.emit("join", { name, room }, (error) => {
  //     // console.log(error);
  //     // throw new Error(error);
  //     console.error(error);
  //   });
  //   // eslint-disable-next-line
  // }, [ENDPOINT, location.search]);
  // console.log(name);
  // console.log(room);

  const fetchChat = async () => {
    const data = await axios.get("http://localhost:8000/api/chats");
    setData(data);
    console.log(data);
  };
  useEffect(() => {
    fetchChat();
  }, []);
  return <div>Chat</div>;
}
