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
import "../../style.css";

function SignupForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);


  return (
    <VStack>
      <FormControl id="signup-name-input" isRequired>
        <FormLabel fontSize={"14px"}>Name:</FormLabel>
        <Input
          required
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          mb={"15px"}
        ></Input>
      </FormControl>

      <FormControl id="signup-email-input" mb={"15px"} isRequired>
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

      <FormControl id="signup-cnfpassword-input" isRequired>
        <FormLabel fontSize={"14px"}>Confirm Password:</FormLabel>
        <InputGroup size="md">
          <Input
            required
            placeholder="Confirm Password"
            onChange={(e) => setCnfPassword(e.target.value)}
            value={cnfPassword}
            type={showCnfPassword ? "text" : "password"}
            mb={"15px"}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowCnfPassword(!showCnfPassword)}
            >
              {showCnfPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel fontSize={"14px"}>Upload Profile Picture:</FormLabel>
        <Input type="file" accept="image/*" onChange={(e)=>{}}></Input>
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
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignupForm;
