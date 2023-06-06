import { Box } from "@chakra-ui/react";
import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
function UserBadgeItem({ user, handleFunction }) {
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
      {user.name}
      <CloseIcon onClick={handleFunction} cursor={"pointer"} />
    </Box>
  );
}

export default UserBadgeItem;
