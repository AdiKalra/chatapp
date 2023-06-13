import React, { useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/chatProvider";
import { Avatar, Box, Text } from "@chakra-ui/react";
import ProfileModal from "../Modals/ProfileModal";
import { isSameSender } from "../../config/ChatLogic";

function ScrollableChat({ messages, isTyping }) {
  const { User, selectedChat } = ChatState();
  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);
  return (
    messages && (
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => {
            return m.sender._id === User._id ? (
              <Box
                className="user-chatbox"
                display={"flex"}
                justifyContent={"flex-end"}
                w={"100%"}
                my={"5px"}
                key={m._id}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  maxW={"60%"}
                  w={"fit-content"}
                  bgColor={"#B1D6FA"}
                  color={"#0c2347"}
                  py={2}
                  px={5}
                  borderRadius={"xl"}
                >
                  <Text>{m.content}</Text>
                </Box>
              </Box>
            ) : (
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={"5px"}
                my={"5px"}
                key={m._id}
              >
                {
                  // i < messages.length - 1 &&
                  // (messages[i + 1].sender._id !== m.sender._id ||
                  //   messages[i + 1] === undefined)
                  isSameSender(messages, m, i) && selectedChat.isGrouped ? (
                    <ProfileModal user={m.sender}>
                      <Avatar
                        w={"40px"}
                        h={"40px"}
                        size={"sm"}
                        name={m.sender.name}
                        src={m.sender.dp}
                        _hover={{
                          cursor: "pointer",
                        }}
                      />
                    </ProfileModal>
                  ) : (
                    <Box
                      w={selectedChat.isGrouped ? "45px" : "0"}
                      h={selectedChat.isGrouped ? "30px" : "0"}
                    ></Box>
                  )
                }
                <Box
                  className="friend-chatbox"
                  display={"flex"}
                  justifyContent={"flex-start"}
                  w={"100%"}
                  // my={"5px"}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    maxW={"60%"}
                    w={"fit-content"}
                    bgColor={"#0c2347"}
                    color={"#fff"}
                    py={2}
                    px={5}
                    borderRadius={"xl"}
                  >
                    {selectedChat.isGrouped && isSameSender(messages, m, i) && (
                      <ProfileModal user={m.sender}>
                        <Text
                          fontWeight={"600"}
                          _hover={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          // onClick={()=>setSelectedChat(m.sender)}
                        >
                          {m.sender.name.toUpperCase()}
                        </Text>
                      </ProfileModal>
                    )}
                    <Text>{m.content}</Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        
        <div ref={messageEndRef} />
      </ScrollableFeed>
    )
  );
}

export default ScrollableChat;
//messages &&
          // messages.map((message, index) => {
          //   return message.sender._id === User._id ? (
          //     <Box width={"100%"} display={"flex"} flexDirection={"row-reverse"}>
          //       <div
          //         style={{
          //           width: "100%",
          //           display: "flex",
          //           // flexWrap: "wrap",
          //           // justifyContent: "flex-end",
          //           // height: "fit-content",
          //           // marginRight: "0",
          //           padding: "3px 2px 3px 0px",
          //           marginTop: "3px",
          //         }}
          //         key={message._id}
          //       >
          //         {message.content}
          //       </div>
          //     </Box>
          //   ) : (
          //     <div
          //       style={{
          //         width: "100%",
          //         display: "flex",
          //         flexWrap: "wrap",
          //         justifyContent: "flex-start",
          //         paddingLeft: "20px",
          //       }}
          //       key={message._id}
          //     >
          //       {message.content}
          // </div>
          // );
          // })