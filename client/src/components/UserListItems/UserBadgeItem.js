import { Box } from "@chakra-ui/react";
import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/chatProvider";
function UserBadgeItem({ user, handleFunction }) {
  const { User } = ChatState();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={"5px"}
      p={2}
      bgColor={"#0c2347"}
      color={"#fff"}
      fontSize={"12px"}
      borderRadius={"lg"}
    >
      {user._id !== User._id ? user.name : `${user.name} (You)`}
      <CloseIcon onClick={handleFunction} cursor={"pointer"} />
    </Box>
  );
}

export default UserBadgeItem;
