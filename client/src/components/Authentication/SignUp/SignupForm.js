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
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const updateDP = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select an image",
        duration: 5000,
        position: "bottom",
        isClosable: true,
        status: "warning",
      });
      setLoading(false);
      return;
    }

    if (
      pic.type === "image/png" ||
      pic.type === "image/jpeg" ||
      pic.type === "image/jpg"
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
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
      return;
    } else {
      toast({
        title: "Please Select an image of jpg, jpeg or png format",
        duration: 5000,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !cnfPassword) {
      toast({
        title: "Please fill all the fields",
        duration: 5000,
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== cnfPassword) {
      toast({
        title: "Password doesn't match",
        duration: 5000,
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const data = {
        name,
        email,
        password,
        dp,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response_data = await axios.post(
        "http://localhost:8000/api/user/",
        data,
        config
      );
      console.log(response_data);

      toast({
        title: "Registration Successful",
        duration: 2000,
        status: "success",
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("user-token", JSON.stringify(response_data.data));
      setLoading(false);
      navigate("/api/chat");
      return;
    } catch (err) {
       if (err.response.status === 400) {
         toast({
           title: `${err.response.data.message}`,
           duration: 2000,
           status: "error",
           isClosable: true,
           position: "bottom",
         });
         setLoading(false);
         return;
       }
      setLoading(false);
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
        onClick={() => handleSubmit()}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignupForm;
