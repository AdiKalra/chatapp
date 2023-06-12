import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import UserBadgeItem from "../UserListItems/UserBadgeItem";
import UserItem from "../UserListItems/UserItem";
import axios from "axios";
import SpinnerLoader from "../Loader/SpinnerLoader";

function GroupProfileModal({ fetchAgain, setFetchAgain }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { User, selectedChat, setSelectedChat } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();

  // Rename Group
  const handleRename = async () => {
    setRenameLoading(true);
    if (!groupChatName || selectedChat.chatName === groupChatName) {
      toast({
        title: "Please enter a new group name",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setRenameLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:8000/api/chat/group/rename",
        // "/api/chat/group/rename",
        {
          name: groupChatName,
          chatId: selectedChat._id,
        },
        config
      );
      setFetchAgain(!fetchAgain);
      setSelectedChat(data);
      setRenameLoading(false);

      toast({
        title: "Group name successfully updated ",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Group name successfully updated",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setRenameLoading(false);
    }
  };

  // Handle searching of users to add new user
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8000/api/user?search=${search}`,
        // `/api/user?search=${search}`,
        config
      );
      setSearchResults(data);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Failed to search for results",
        duration: 2000,
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // Handles the click function for the searched user tiles to add user to group
  const handleAddUser = async (users) => {
    if (selectedChat.users.find((u) => u._id === users._id)) {
      toast({
        title: "User already exists in the group",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (selectedChat.admin._id !== User._id) {
      toast({
        title: "Only admin can add users in the group",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);
      setSearch();
      const config = {
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:8000/api/chat/group/add",
        // "/api/chat/group/add",
        { chatId: selectedChat._id, users: users._id },
        config
      );
      setFetchAgain(!fetchAgain);
      setSelectedChat(data);
      setLoading(false);
    } catch (err) {
      toast({
        title: "User already added in the group",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  };

  // Remove user from group
  const removeUserFromGroup = async (users) => {
    if (selectedChat.admin._id !== User._id) {
      toast({
        title: "Only admin can add users in the group",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:8000/api/chat/group/remove",
        // "/api/chat/group/remove",
        { chatId: selectedChat._id, users: users._id },
        config
      );
      toast({
        title: "Successfully removed user from the group",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      setFetchAgain(!fetchAgain);
      setSelectedChat(data);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error occured while removing user from the group",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
  };

  // Handles modal closing function
  const handleClose = () => {
    setLoading(false);
    setSearch();
    setSearchResults([]);
    setGroupChatName()
    onClose();
  };

  // Handles leave group functionality
  const handleLeaveGroup = async (user) => {
    if (user._id === selectedChat.admin._id) {
      toast({
        title: "Admin cannot leave the group",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      };

      await axios.put(
        "http://localhost:8000/api/chat/group/remove",
        // "/api/chat/group/remove",
        { chatId: selectedChat._id, users: user._id },
        config
      );
      setFetchAgain(!fetchAgain);
      setSelectedChat("");
      setLoading(false);
      toast({
        title: "Sucessfully left the group",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        justifyContent={"center"}
        alignItems={"center"}
        w={"40px"}
        h={"40px"}
        borderRadius={"lg"}
        _hover={{ color: "#fff", bgColor: "#0B2447" }}
        cursor={"pointer"}
        _active={{ transform: "scale(0.9)" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <span onClick={onOpen}>
        <div>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              p={"25px 5px 25px 5px"}
            >
              <ModalHeader>
                <Text fontSize={"24px"}>
                  {selectedChat.chatName.toUpperCase()}
                </Text>
                <ModalCloseButton onClick={handleClose} />
              </ModalHeader>

              <ModalBody
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"15px"}
              >
                <Box
                  display={"flex"}
                  alignContent={"center"}
                  gap={"5px"}
                  flexWrap={"wrap"}
                  mb={"55px"}
                >
                  {selectedChat.users.map((user) => {
                    return (
                      <UserBadgeItem
                        key={user._id}
                        user={user}
                        handleFunction={() => {
                          removeUserFromGroup(user);
                        }}
                      />
                    );
                  })}
                </Box>

                <Text w={"100%"}>Edit Group Details</Text>
                <FormControl display={"flex"} gap={2}>
                  <Input
                    placeholder="Group Name"
                    mb={2}
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                  <Button
                    color={"#fff"}
                    bgColor={"#0B2447"}
                    _hover={false}
                    _active={{ transform: "scale(0.9)" }}
                    isLoading={renameLoading}
                    onClick={() => handleRename()}
                  >
                    Update
                  </Button>
                </FormControl>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"1px"}
                  w={"100%"}
                  overflowY={"scroll"}
                >
                  <FormControl
                    display={"flex"}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                    gap={"5px"}
                    mb={5}
                  >
                    <Input
                      placeholder="Add users to the group"
                      mb={2}
                      onChange={(e) => handleSearch(e.target.value)}
                      w={"100%"}
                      mt={2}
                    />
                  </FormControl>

                  {loading ? (
                    <SpinnerLoader />
                  ) : (
                    searchResults
                      .slice(0, 4)
                      .map((user) => (
                        <UserItem
                          key={user._id}
                          user={user}
                          handleFunction={() => handleAddUser(user)}
                        />
                      ))
                  )}
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => handleLeaveGroup(User)}
                >
                  Leave Group
                </Button>
                <Button colorScheme="red" mr={3} onClick={handleClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </span>
    </>
  );
}

export default GroupProfileModal;
