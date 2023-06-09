import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";


function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
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
      )}
      <span onClick={onOpen}>
        <div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              p={"25px 5px 25px 5px"}
            >
              <ModalHeader>
                <Text fontSize={"24px"}>Profile</Text>
                <ModalCloseButton />
              </ModalHeader>

              <ModalBody
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"15px"}
              >
                <Text fontSize={"24px"}>{user.name}</Text>
                <Avatar
                  icon={<i class="fa-regular fa-user" />}
                  size="2xl"
                  name={user.name}
                  src={user.dp}
                />
                <Text fontSize={"24px"}>{user.email}</Text>
              </ModalBody>

              <ModalFooter>
                {
                  //   <Button colorScheme="blue" mr={3}>
                  //   Edit Profile
                  // </Button>
                }
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </span>
    </>
  );
}

export default ProfileModal;
