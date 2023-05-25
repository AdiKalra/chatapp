import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "All fields are requires",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        email,
        password,
      };

      const { response_data } = await axios.post(
        "http://localhost:8000/api/user/login",
        data,
        config
      );

      toast({
        title: "Login Successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      console.log(response_data);
      localStorage.setItem("login_data", JSON.stringify(response_data));
      navigate("/api/chat");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <VStack>
      <FormControl id="login-email-input" isRequired>
        <FormLabel fontSize={"14px"}>Email Address:</FormLabel>
        <Input
          required
          placeholder="Enter your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          mb={"15px"}
        ></Input>
      </FormControl>
      <FormControl id="login-password-input" isRequired>
        <FormLabel fontSize={"14px"}>Password:</FormLabel>
        <InputGroup size="md">
          <Input
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            mb={"15px"}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        mt={4}
        bgColor="#0B2447"
        color={"#fff"}
        type="submit"
        width={"100%"}
        _hover={{
          color: "#fff",
          bgColor: "#19376D",
        }}
        isLoading={loading}
        onClick={() => handleSubmit()}
      >
        Login
      </Button>
      <Button
        mt={4}
        bgColor="#C74B50"
        color={"#fff"}
        type="submit"
        width={"100%"}
        _hover={{
          color: "#fff",
          bgColor: "#e84B50",
        }}
        onClick={() => {
          setEmail("guest@chatapp.com");
          setPassword("guest1234");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default LoginForm;


