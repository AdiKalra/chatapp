import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ListLoader from "../Loader/ListLoader";
import { getSender } from "../../config/ChatLogic";
import GroupChatModal from "./GroupChatModal";

function AllChats() {
  const { User, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const toast = useToast();

  const fetchChats = async () => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8000/api/chat/",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      bgColor={"#fff"}
      w={{ base: "100%", md: "30%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
      h={"100%"}
    >
      <Box
        display={"flex"}
        w={"100%"}
        p={3}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={"1px"}
        borderColor={"#0c2347"}
      >
        <Text fontSize="22px">All Chats</Text>
        <GroupChatModal>
          <Button display={"flex"} gap={2} p={"0px 15px"}>
            <Text
              fontSize="17px"
              display={{ base: "none", md: "none", lg: "flex" }}
            >
              New Group Chat
            </Text>
            <AddIcon />
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        px={"3px"}
        py={"10px"}
        w={"100%"}
        h={"100%"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {console.log(chats)}
            {chats.map((chat) => {
              return (
                <Box
                  key={chat._id}
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                  cursor={"pointer"}
                  bgColor={selectedChat === chat ? "#0B2447" : "#edf2f6"}
                  color={selectedChat === chat ? "#fff" : "#0B2447"}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                >
                  <Text>
                    {!chat.isGrouped
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ListLoader />
        )}
      </Box>
    </Box>
  );
}

export default AllChats;
// bgColor={"#edf2f6"}