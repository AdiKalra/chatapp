import {
  Box,
  Button,
  FormControl,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import axios from "axios";
import "../style.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000";

var socket, selectedChatCompare;
function ChatBoxBody({ fetchAgain, setFetchAgain }) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  // const [typing, setTyping] = useState(false);
  // const [isTyping, setIsTyping] = useState(false);
  const { User, selectedChat, notifications, setNotifications } = ChatState();
  const toast = useToast();

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", User);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChat || // if chat is not selected or doesn't match current chat
        selectedChat._id !== newMessageReceived.chat._id
      ) {
        // show notification
        // if (!notifications.includes(newMessageReceived)) {
        setNotifications([...notifications, newMessageReceived]);
        setFetchAgain(!fetchAgain);
        // }
      } else if (
        selectedChat &&
        selectedChat._id === newMessageReceived.chat._id
      ) {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8000/api/message/${selectedChat._id}`,
        // `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Unable to fetch messages",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const sendMessage = async (e) => {
    const type = e.type;
    const keydown = type === "keydown" && e.key === "Enter";
    const click = type === "click";

    // socket.emit("stop typing", selectedChat._id);
    if ((keydown || click) && newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          // "http://localhost:8000/api/message",
          "/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        setMessages([...messages, data]);
        socket.emit("new message", data);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "Unable to fetch messages",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // if (!socketConnected) return;

    // if (!typing) {
    //   setTyping(true);
    //   socket.emit("typing", selectedChat._id);
    // }
    // let lastTypingTime = new Date().getTime();
    // var timerLength = 3000;
    // setTimeout(() => {
    //   var timeNow = new Date().getTime();
    //   var timeDiff = timeNow - lastTypingTime;
    //   if (timeDiff >= timerLength && typing) {
    //     socket.emit("stop typing", selectedChat._id);
    //     setTyping(false);
    //   }
    // }, timerLength);
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"end"}
        maxH={"85%"}
        h={"85%"}
        bgColor={"#edf2f6"}
        color={"#0B2447"}
        borderRadius={"lg"}
        px={"40px"}
        py={5}
      >
        {loading ? (
          <Spinner size="xl" w={20} h={20} alignSelf={"center"} m={"auto"} />
        ) : (
          <div className="messages">
            <ScrollableChat messages={messages} />
          </div>
        )}

        <FormControl
          onKeyDown={(e) => sendMessage(e)}
          display={"flex"}
          gap={"10px"}
          alignItems={"center"}
          mt={"20px"}
          isRequired
        >
          <Input
            type="text"
            bgColor={"#FFF"}
            h={"50px"}
            value={newMessage}
            placeholder="Message"
            onChange={(e) => typingHandler(e)}
          />
          <Button
            color="#fff"
            bgColor="#0B2447"
            h={"50px"}
            borderRadius={"lg"}
            _hover={{ color: "#fff", bgColor: "#0B2447" }}
            cursor={"pointer"}
            _active={{ transform: "scale(0.9)" }}
            onClick={(e) => sendMessage(e)}
          >
            Send
          </Button>
        </FormControl>
      </Box>
    </>
  );
}

export default ChatBoxBody;
