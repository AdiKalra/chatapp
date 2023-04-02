import React, { createContext, useState } from "react";

const UserDataContext = createContext(null);

export default function UserDataContextProvider(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const joinDetails = {
    name,
    room,
    setName,
    setRoom,
  };

  return (
    <UserDataContext.Provider value={joinDetails}>
      {props.children}
    </UserDataContext.Provider>
  );
}
