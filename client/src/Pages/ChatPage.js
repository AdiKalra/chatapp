import { ChatState } from "../Context/chatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Chat Page/SideDrawer";
import ChatBox from "../components/Chat Page/ChatBox";
import AllChats from "../components/Chat Page/AllChats";
export default function ChatPage(props) {
  const { User } = ChatState();
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
        {User && <AllChats />}
        {User && <ChatBox />}
      </Box>
    </div>
  );
}
