import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../style.css";
function SignupForm() {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [dp, setDp] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(dp);
  }, [dp]);
  const updateDP = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: `Please select an image`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/jpg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chatapp");
      data.append("cloud_name", "adikalra");
      fetch("https://api.cloudinary.com/v1_1/adikalra/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setDp(res.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: `Please select an image`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(dp);
      setLoading(false);
      return;
    }
  };
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
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => updateDP(e.target.files[0])}
          // onClick={(e) => updateDP(e.target.file)}
        ></Input>
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
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignupForm;
