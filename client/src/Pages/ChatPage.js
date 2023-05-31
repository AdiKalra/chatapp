import { ChatState } from "../Context/chatProvider";

export default function ChatPage(props) {
  const { User } = ChatState();
  console.log(User);
  return <div style={{"color":"#fff"}}>{User}</div>;
}
