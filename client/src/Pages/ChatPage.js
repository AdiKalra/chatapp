import { ChatState } from "../Context/chatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Drawers/SideDrawer";
import ChatBox from "../components/Chat Page/ChatBox";
import AllChats from "../components/Chat Page/AllChats";
import { useState } from "react";
export default function ChatPage() {
  const { User } = ChatState();

    const [fetchAgain, setFetchAgain] = useState(false)
  return (
    <div>
      {User && <SideDrawer />}
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100vw"}
        h={"90vh"}
        padding={"30px"}
        gap={"50px"}
      >
        {User && (
          <AllChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {User && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}
