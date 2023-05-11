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

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      <FormControl id="signup-password-input" isRequired>
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
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default LoginForm;
