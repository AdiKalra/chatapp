// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LoginForm from "../components/Authentication/LoginForm";
import SignupForm from "../components/Authentication/SignupForm";


export default function HomePage() {
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");

  return (
    <Container
      maxW={"md"}
      minW={"md"}
      centerContent
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={"50px"}
    >
      <Box
        d={"flex"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"white"}
        w={"100%"}
        borderRadius={"lg"}
        minH={"40px"}
        mb={"20px"}
        fontSize={"3xl"}
        fontFamily={"Work sans"}
      >
        <Text color={"#0B2447"} fontWeight={900}>
          CHAT APP
        </Text>
      </Box>
      <Box
        d={"flex"}
        display={"flex"}
        justifyContent={"center"}
        bgColor={"white"}
        w={"100%"}
        borderRadius={"lg"}
        minH={"40%"}
        maxH={"90%"}
        mt={"20px"}
        p={"10px"}
      >
        <Tabs width={"80%"}>
          <TabList mb={"10px"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignupForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

// {
// <div className="joinOuterContainer">
//   <div className="joinInnerContainer">
//     <h1 className="heading">Join</h1>
//     <div>
//       <input
//         type="text"
//         className="joinInput"
//         onChange={(event) => setName(event.target.value)}
//         // onChange={handleChange}
//         placeholder="Name"
//         id="name"
//         name="name"
//         value={name}
//         // value={details.name}
//       />
//     </div>
//     <div>
//       <input
//         type="text"
//         className="joinInput mt-20"
//         onChange={(event) => setRoom(event.target.value)}
//         // onChange={handleChange}
//         placeholder="Room"
//         id="room"
//         name="room"
//         value={room}
//         // value={details.room}
//       />
//     </div>
//     <Link
//       onClick={(event) => (!name || !room ? event.preventDefault() : null)}
//       to={`/chat?name=${name}&room=${room}`}
//     >
//       <button className="button mt-20" type="submit">
//         Sign In
//       </button>
//     </Link>
//   </div>
// </div>;}
