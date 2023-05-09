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
  // const [name, setName] = useState("");email
  return (
    <VStack>
      <FormControl id="signup-name-input" mb={"5px"} isRequired>
        <FormLabel fontSize={"14px"} mb={"1px"}>
          Name:
        </FormLabel>
        <Input
          // variant="flushed"
          required
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></Input>
      </FormControl>

      <FormControl id="signup-email-input" isRequired mb={"5px"}>
        <FormLabel fontSize={"14px"} mb={"1px"}>
          Email Address:
        </FormLabel>
        <Input
          // variant="flushed"
          required
          placeholder="Enter your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></Input>
      </FormControl>

      <FormControl id="signup-password-input" isRequired mb={"5px"}>
        <FormLabel fontSize={"14px"} mb={"1px"}>
          Password:
        </FormLabel>
        <InputGroup size="md">
          <Input
            // variant="flushed"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
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

      <FormControl id="signup-cnfpassword-input" isRequired mb={"5px"}>
        <FormLabel fontSize={"14px"} mb={"1px"}>
          Confirm Password:
        </FormLabel>
        <InputGroup size="md">
          <Input
            // variant="flushed"
            required
            placeholder="Confirm Password"
            onChange={(e) => setCnfPassword(e.target.value)}
            value={cnfPassword}
            type={showCnfPassword ? "text" : "password"}
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

      <FormControl mb={"5px"}>
        <FormLabel fontSize={"14px"} mb={"1px"}>
          Upload Profile Picture:
        </FormLabel>
        <Input type="file" accept="image/*" on></Input>
      </FormControl>
    </VStack>
  );
}

export default SignupForm;
