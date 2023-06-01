import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoadingt] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  return <div>
    <Box>
      
    </Box>
  </div>;
}

export default SideDrawer;
