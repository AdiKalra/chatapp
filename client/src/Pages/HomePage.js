import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LoginForm from "../components/Authentication/Login/LoginForm";
import SignupForm from "../components/Authentication/SignUp/SignupForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-token"));
    if (user) navigate("/api/chat");

    // eslint-disable-next-line
  }, []);
  return (
    <Container
      maxW={"lg"}
      minW={"md"}
      centerContent
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={"2em"}
      pb={"10px"}
    >
      <Box
        d={"flex"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"white"}
        w={"100%"}
        borderRadius={"lg"}
        minH={"80px"}
        mb={"10px"}
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