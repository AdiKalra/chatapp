import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [User, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (!user) {
      navigate("/");
      return;
    }
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ User, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
