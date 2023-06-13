import {
  Box,
  Button,
  Text,
  useToast,
  Tooltip,
  Input,
  useDisclosure,
  Spinner,
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
import ProfileModal from "../Modals/ProfileModal";
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
import UserItem from "../UserListItems/UserItem";
import ListLoader from "../Loader/ListLoader";
import { getSender } from "../../config/ChatLogic";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    User,
    setSelectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setChats([]);
    setSelectedChat();
    navigate("/");
    toast({
      title: "Logout Successful",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  // useEffect(() => {
  //   console.log("chat: ", chats);
  // }, [chats]);

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
          // `/api/user?search=${search}`,
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

  const access = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${User.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/chat/",
        // "/api/chat/",
        { userId },
        config
      );

      setSelectedChat(data);
      if (!chats.find((c) => c._id === userId))
        // setChats((prev) => [data, ...prev]);
        setChats([data, ...chats]);

      onClose();
      setLoadingChat(false);
      handleCancel();
    } catch (err) {
      toast({
        title: "Error fetching the chat",
        status: "error",
        description: err.message,
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
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
              leftIcon={<i className="fa-solid fa-magnifying-glass" />}
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
              <BellIcon
                fontSize={"3xl"}
                color={notifications.length > 0 ? "red" : "black"}
              />
            </MenuButton>
            <MenuList px={3}>
              {!notifications.length && "No new messages"}
              {notifications.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotifications(notifications.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGrouped
                    ? `New message in ${notif.chat.chatName}`
                    : `New message from ${
                        getSender(User, notif.chat.users).name
                      }`}
                </MenuItem>
              ))}
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
              <ProfileModal user={User}>
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
        onClose={() => {
          handleCancel();
          onClose();
        }}
        finalFocusRef={btnRef}
        size={"sm"}
        allowPinchZoom
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
                value={search || ""}
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
              {loading ? <ListLoader /> : search ? Results : ""}
              {loadingChat ? (
                <Spinner
                  ml={"150px"}
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : (
                ""
              )}
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
