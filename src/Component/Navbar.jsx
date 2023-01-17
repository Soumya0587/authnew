import React from "react";
import { Link as RouterLink } from "react-router-dom";
import UseAuth from "../custom-hooks/UseAuth";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
} from "@chakra-ui/react";
import { logout } from "../Pages/Login";
const Navbar = () => {
  const { currentUser, userDetails } = UseAuth();
  console.log("currentUser: ", currentUser);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap="20px">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/signup">SignUp</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/admin">Admin Page</RouterLink>
            <Text>
              {currentUser
                ? userDetails?.displayName || currentUser?.email
                : "Person"}
            </Text>
            <Button my="2" onClick={logout}>
              Logout
            </Button>
          </Flex>

          <Box>Logo</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
