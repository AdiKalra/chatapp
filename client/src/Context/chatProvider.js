import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [User, setUser] = useState();
  
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user-token"));
    setUser(userToken);
    if (!userToken) {
      navigate("/");
      return;
    }
 }, [navigate]);

  return (
    <ChatContext.Provider value={{ User, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
