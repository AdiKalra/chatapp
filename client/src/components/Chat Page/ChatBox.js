import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/chatProvider";
import SingleChat from "./SingleChat";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDirection={"column"}
      gap={"20px"}
      p={"20px"}
      bgColor={"#fff"}
      w={{ base: "100%", md: "70%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
      h={"100%"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}

export default ChatBox;
