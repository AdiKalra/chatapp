import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function UserSearchLoader() {
  return (
    <Stack>
      <Stack>
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
      </Stack>
    </Stack>
  );
}

export default UserSearchLoader;
