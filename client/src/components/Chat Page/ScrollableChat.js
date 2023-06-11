import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/chatProvider";
import { Box } from "@chakra-ui/react";
function ScrollableChat({ messages }) {
  const { User, selectedChat } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => {
          return message.sender._id === User._id ? (
            <Box width={"100%"} display={"flex"} flexDirection={"row-reverse"}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  // flexWrap: "wrap",
                  // justifyContent: "flex-end",
                  // height: "fit-content",
                  // marginRight: "0",
                  padding: "3px 2px 3px 0px",
                  marginTop: "3px",
                }}
                key={message._id}
              >
                {message.content}
              </div>
            </Box>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                paddingLeft: "20px",
              }}
              key={message._id}
            >
              {message.content}
            </div>
          );
        })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;

// {messages &&
//   messages.map((message, index) => {
// return message.sender._id === User._id ? (
//   <div
//     style={{
//       width: "100%",
//       display: "flex",
//       justifyContent: "flex-end",
//       height: "fit-content",
//       padding: "3px 20px 3px 0px",
//       marginTop: "3px",
//     }}
//     key={message._id}
//   >
//     {message.content}
//   </div>
// ) : (
//   <div
//     style={{
//       width: "100%",
//       display: "flex",
//       justifyContent: "flex-start",
//       paddingLeft: "20px",
//     }}
//     key={message._id}
//   >
//     {message.content}
//   </div>
// );

// <div
//   style={{
//     width: "100%",
//     display: "flex",
//     justifyContent:
//       message.sender._id === User._id ? "flex-end" : "flex-start",
//   }}
//   key={message._id}
// >
//   {message.sender.name}
// </div>
// })}
