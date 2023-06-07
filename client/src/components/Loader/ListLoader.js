import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function ListLoader() {
  return (
    <Stack>
      <Stack>
        <Skeleton height="70px" borderRadius={"lg"} />
        <Skeleton height="70px" borderRadius={"lg"} />
        <Skeleton height="70px" borderRadius={"lg"} />
        <Skeleton height="70px" borderRadius={"lg"} />
        <Skeleton height="70px" borderRadius={"lg"} />
        <Skeleton height="70px" borderRadius={"lg"} />
        <Skeleton height="70px" borderRadius={"lg"} />
        <Skeleton height="70px" borderRadius={"lg"} />
      </Stack>
    </Stack>
  );
}

export default ListLoader;
