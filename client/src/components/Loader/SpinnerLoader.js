import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

function SpinnerLoader() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <Spinner color={"#0B2447"} size="xl" />
    </Box>
  );
}

export default SpinnerLoader;
