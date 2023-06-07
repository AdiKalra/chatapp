import React from "react";
import { ChatState } from "../../Context/chatProvider";
import { Avatar, Box, Text } from "@chakra-ui/react";
import ProfileModal from "../Modals/ProfileModal";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { getSender } from "../../config/ChatLogic";
import GroupProfileModal from "../Modals/GroupProfileModal";

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { User, selectedChat, setSelectedChat } = ChatState();

  // const getChatName = () => {
  //   const users = selectedChat.users;
  //   return users[0]._id === User._id
  //     ? users[1].name.toUpperCase()
  //     : users[0].name.toUpperCase();
  // };

  // const getChatDP = () => {
  //   const users = selectedChat.users;
  //   return users[0]._id === User._id ? users[1].dp : users[0].dp;
  // };
  return (
    <>
      {selectedChat ? (
        <Box>
          <Box ml={"20px"} display={"flex"} justifyContent={"space-between"}>
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
                <GroupProfileModal />
              ) : (
                <ProfileModal user={getSender(User, selectedChat.users)} />
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
          w={"100%"}
          pb={"80px"}
        >
          <Text fontSize={"60px"}>CHAT APP</Text>
          <Text fontSize={"26px"}>Click on user to start chatting.</Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
