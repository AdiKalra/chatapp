import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import axios from "axios";
import UserItem from "../UserListItems/UserItem";
import UserBadgeItem from "../UserListItems/UserBadgeItem";
import SpinnerLoader from "../Loader/SpinnerLoader";

function CreateGroupModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { User, chats, setChats, setSelectedChat } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
        // `http://localhost:8000/api/user?search=${search}`,
        `/api/user?search=${search}`,
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
  const handleGroupMembers = (user) => {
    if (selectedUsers.includes(user)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSearch();
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleClose = () => {
    setLoading(false);
    setSearch();
    setSearchResults([]);
    setSelectedUsers([]);
    setGroupChatName();
    onClose();
  };

  const handleDelete = (delUser) => {
    const participants = selectedUsers.filter((sel) => sel._id !== delUser._id);
    setSelectedUsers(participants);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!groupChatName) {
      toast({
        title: "Please enter group name",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    if (selectedUsers.length < 2) {
      toast({
        title: `Add at leatst ${2 - selectedUsers.length} more users`,
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${User.token}`,
        },
      };

      const groupData = {
        name: groupChatName,
        users: selectedUsers,
      };
      const { data } = await axios.post(
        // "http://localhost:8000/api/chat/group",
        "/api/chat/group",
        groupData,
        config
      );

      setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
      handleClose();

      toast({
        title: "Group Created",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {}
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"26px"}
            display={"flex"}
            justifyContent={"center"}
          >
            CREATE GROUP
          </ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                type="text"
                placeholder="Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
                value={groupChatName}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel></FormLabel>
              <Input
                type="text"
                placeholder="Add Participants"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
                value={search}
                required
              />
            </FormControl>
            {/* Selected Users */}
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              width={"100%"}
              gap={"5px"}
              py={"10px"}
            >
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  handleFunction={() => handleDelete(user)}
                  user={user}
                />
              ))}
            </Box>

            {loading ? (
              <SpinnerLoader />
            ) : (
              searchResults
                .slice(0, 4)
                .map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroupMembers(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Button
              bgColor={"#0c2347"}
              color={"#fff"}
              _hover={{ color: "#0c2347", bgColor: "#edf2f6" }}
              mr={3}
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Button colorScheme="red" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateGroupModal;
