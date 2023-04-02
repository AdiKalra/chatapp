import React, { useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
// import UserDataContextProvider from "../../context/UserDataContextProvider";

import "./Chat.css";

let socket;
export default function Chat(props) {
  // const { setName, setRoom } = useContext(UserDataContextProvider);
  //  const [name, setName] = useState("");
  //  const [room, setRoom] = useState("");
  const location = useLocation();
  const ENDPOINT = 'localhost:8000';
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    console.log(socket);
    console.log(name, room);
    // setName(name);
    // setRoom(room);
    // eslint-disable-next-line
  }, []);
  return <div>Chat</div>;
}
