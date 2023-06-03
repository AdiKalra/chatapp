import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/chatProvider";

function ChatBox() {
  const { User, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "flex", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      bgColor={"#fff"}
      w={{ base: "100%", md: "70%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
      h={"100%"}
    ></Box>
  );
}

export default ChatBox;
