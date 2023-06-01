import { ChatState } from "../Context/chatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Chat Page/SideDrawer";
import MyChats from "../components/Chat Page/MyChats";
import ChatBox from "../components/Chat Page/ChatBox";
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
        {User && <MyChats />}
        {User && <ChatBox />}
      </Box>
    </div>
  );
}
