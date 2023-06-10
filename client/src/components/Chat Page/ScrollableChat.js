import React from "react";
import ScrollableFeed from "react-scrollable-feed";
function ScrollableChat({ messages }) {
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => {
          return (
            <div style={{ display: "flex" }} key={message._id}>
              message {index}
            </div>
          );
        })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
