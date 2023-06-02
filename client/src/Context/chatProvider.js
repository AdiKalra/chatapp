import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [User, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    // console.log(User);
    if (!user) {
      navigate("/");
      return;
    }
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ User, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
