import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import { Box, Text } from "@chakra-ui/react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxBody from "./ChatBoxBody";

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { User, selectedChat, setSelectedChat } = ChatState();

  const [loading, setLoading] = useState(true);

  return (
    <>
      {selectedChat ? (
        <>
          <ChatBoxHeader
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            
          />
          {/* <Box ml={"20px"} display={"flex"} justifyContent={"space-between"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"30px"}
            justifyContent={"space-between"}
          >
            <Box
              display={{ base: "flex", md: "none" }}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"30px"}
              color={"#0B2447"}
              bgColor={"#edf2f6"}
              w={"40px"}
              h={"40px"}
              borderRadius={"lg"}
              _hover={{ color: "#fff", bgColor: "#0B2447" }}
              cursor={"pointer"}
              _active={{ transform: "scale(0.9)" }}
              onClick={() => {
                setSelectedChat("");
              }}
            >
              <ChevronLeftIcon />
            </Box>
            <Avatar
              size="md"
              name={
                selectedChat.isGrouped
                  ? selectedChat.chatName
                  : getSender(User, selectedChat.users).name
              }
              src={
                selectedChat.isGrouped
                  ? ""
                  : getSender(User, selectedChat.users).dp
              }
            />
            <Text fontSize={"24px"}>
              {selectedChat.isGrouped
                ? selectedChat.chatName.toUpperCase()
                : getSender(User, selectedChat.users).name.toUpperCase()}
            </Text>
          </Box>
          <Box>
            {selectedChat.isGrouped ? (
              <GroupProfileModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            ) : (
              <ProfileModal user={getSender(User, selectedChat.users)} />
            )}
          </Box>
        </Box>*/}

          <ChatBoxBody />
        </>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
          w={"100%"}
          p={5}
          pb={"80px"}
          bgColor={"#edf2f6"}
          color={"#0B2447"}
          borderRadius={"lg"}
        >
          <Text fontSize={"60px"}>CHAT APP</Text>
          <Text fontSize={"26px"}>Click on user to start chatting.</Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
