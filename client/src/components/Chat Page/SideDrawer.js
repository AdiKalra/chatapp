import {
  Box,
  Button,
  Text,
  useToast,
  Tooltip,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/chatProvider";
import ProfileModal from "./ProfileModal";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import UserSearchLoader from "../UserListItems/UserSearchLoader";
import UserItem from "../UserListItems/UserItem";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState(false);
  const { User } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/");
    toast({
      title: "Logout Successful",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   if (search.length === 0) {
  //     toast({
  //       title: "Please enter name or email",
  //       status: "warning",
  //       duration: 1000,
  //       position: "top-left",
  //       isClosable: true,
  //     });
  //   } else {
  //     const result = await axios.get(
  //       `http://localhost:8000/api/user?search=${search}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${User.token}`,
  //         },
  //       }
  //     );
  //     setSearchResult(result.data);
  //     // console.log(result);
  //   }
  //   setLoading(false);
  // };

  const fetchResults = async () => {
    setLoading(true);
    if (!search) {
      setSearchResult([]);
      setLoading(false);
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${User.token}`,
          },
        };
        const result = await axios.get(
          `http://localhost:8000/api/user?search=${search}`,
          config
        );
        setSearchResult(result.data);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      } catch (err) {}
    }
  };
  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line
  }, [search]);

  const handleCancel = () => {
    setSearch();
    setSearchResult([]);
    setLoading(false);
    onClose();
  };
  const access = (_id) => {};
  const Results = searchResult ? (
    searchResult.map((user) => {
      return (
        <UserItem
          key={user._id}
          user={user}
          handleFunction={() => access(user._id)}
        />
      );
    })
  ) : (
    <span>No result found . . . .</span>
  );
  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bgColor={"rgb(237,242,246)"}
        p={"5px 15px 5px 15px"}
        minH={"65px"}
      >
        <Box>
          <Tooltip label={"Search User or Chat"} placement="bottom" hasArrow>
            <Button
              color="#0B2447"
              variant={"outline"}
              leftIcon={<i class="fa-solid fa-magnifying-glass" />}
              ref={btnRef}
              onClick={onOpen}
            >
              <Text display={{ base: "none", md: "flex" }} p={"2px"}>
                Search
              </Text>
            </Button>
          </Tooltip>
        </Box>

        <Box>
          <Text fontSize={"4xl"} color={"#0B2447"} fontFamily={"Work sans"}>
            CHAT APP
          </Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Menu>
            <MenuButton>
              <BellIcon fontSize={"3xl"} />
            </MenuButton>
            <MenuList>
              <MenuItem></MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              color="#0B2447"
              p={"2px"}
              borderRadius={"50%"}
              h={"50px"}
              w={"50px"}
            >
              <Avatar
                icon={<i class="fa-regular fa-user" />}
                size="md"
                name={User.name}
                src={User.dp}
              />
            </MenuButton>
            <MenuList p={"5px 15px"}>
              <MenuGroup>
                <MenuItem fontWeight={"600"} fontSize={"16px"} pl={"15px"}>
                  Hi, {User.name}
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <ProfileModal>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutHandler} color={"red"}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={handleCancel} />
          <DrawerHeader>Search User</DrawerHeader>
          <DrawerBody display={"flex"} flexDirection={"column"} gap={"5px"}>
            {/*<Box display={"flex"} justifyContent={"center"} gap={"5px"}>
              <Input
                placeholder="Type name or email here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSubmit} isLoading={loading}>
                Go
              </Button>
            </Box>*/}

            <Box display={"flex"} justifyContent={"center"} gap={"5px"}>
              <Input
                placeholder="Type name or email here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box mt={"20px"}>
              {/*{loading ? (
                <UserSearchLoader />
              ) : search && searchResult ? (
                searchResult.map((user) => (
                  <UserItem key={user._id} user={user} />
                ))
              ) : (
                "No result found"
              )}*/}
              {loading ? <UserSearchLoader /> : search ? Results : ""}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="red" mr={3} onClick={handleCancel}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SideDrawer;
