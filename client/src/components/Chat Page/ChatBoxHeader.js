import { ChevronLeftIcon } from "@chakra-ui/icons";
import React from "react";
import { getSender } from "../../config/ChatLogic";
import GroupProfileModal from "../Modals/GroupProfileModal";
import ProfileModal from "../Modals/ProfileModal";
import { ChatState } from "../../Context/chatProvider";
import { Avatar, Box, Text } from "@chakra-ui/react";

function ChatBoxHeader({ fetchAgain, setFetchAgain }) {
  const { User, selectedChat, setSelectedChat } = ChatState();
  
  return (
    <>
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
            <GroupProfileModal
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          ) : (
            <ProfileModal user={getSender(User, selectedChat.users)} />
          )}
        </Box>
      </Box>
    </>
  );
}

export default ChatBoxHeader;
