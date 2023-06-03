import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function UserItem({ user, handleFunction }) {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bgColor={"#e8e8e8"}
      _hover={{
        bgColor: "#edf2f6",
        color: "#0c2347",
      }}
      w="100%"
      display={"flex"}
      alignItems={"center"}
      color={"#0c2347"}
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"pointer"}
        name={user.name}
        src={user.dp}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"xs"}>
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
}

export default UserItem;
