import {
  
  Box,
  Button,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  
} from "@chakra-ui/react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";

const Admin = () => {
    
  const [profileData, setProfileData] = useState({});
  const [deleteUserData, setDeleteUserData] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [globalData, setGlobalData] = useState({
    users: "",
    activeUserCount: "",
  });

  console.log("globalData: ", globalData);
  useEffect(() => {
    // * for realtime update
    const userCollectionRef = collection(db, "users");
    const unsubscribe = onSnapshot(
      userCollectionRef,
      (snapShot) => {
        var temp = [];
        snapShot.docs.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        FindActiveUser(temp);
        setGlobalData((prev) => ({ ...prev, users: [...temp] }));
      },
      (error) => console.log(error)
    );

    // * cleanup function
    return unsubscribe;
  }, []);

  const FindActiveUser = (items) => {
    console.log("items: ", items);
    const activeUser = items.filter((user) => user.isActive);
    console.log("activeUser: ", activeUser);
    const activeUserCount = activeUser.length;
    setGlobalData((prev) => ({
      ...prev,
      activeUserCount: activeUserCount,
      activeUser: activeUser,
    }));
  };
  

  const DeleteUserConfirmation = (data) => {
    setDeleteUserData(data);
    
  };

  // *deleting the users
  const DeleteUser = () => {
    const item = deleteUserData;
    deleteDoc(doc(db, "users", item.id)).then(() => {
        
      alert(`${item.email} has been deleted.`, "success");
    });
  };
  return (
    <>
       
      <Box>
        
        <Popover>
  <PopoverTrigger>
    <Button>Trigger</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure you want delet this user?
        <Button onClick={DeleteUser}>delete</Button>
    </PopoverBody>
  </PopoverContent>
</Popover>
        <Heading textAlign={"center"} padding="5">
          Users
        </Heading>
        <Table>
          <TableCaption>Here you can see the user details</TableCaption>
          <Thead bg="blue.500">
            <Tr>
              <Th color={"white"}>S.no</Th>
              <Th color={"white"}>User Id</Th>
              <Th color={"white"}>User name</Th>
              <Th color={"white"}>User Email</Th>
              <Th color={"white"}>Phone Number</Th>
              <Th color={"white"}>Gender</Th>
              <Th color={"white"}>Delete User</Th>
            </Tr>
          </Thead>
          <Tbody>
            {globalData?.users &&
              globalData.users?.map((data, i) => (
                <Tr key={data.id}>
                  <Td>{i + 1}</Td>
                  <Td opacity={".7"}>{data.id}</Td>
                  <Td>{data.displayName}</Td>
                  <Td>{data.email}</Td>
                 <Td>{data.phone}</Td>
                 <Td>{data.genderDetails}</Td>
                  
                  <Td>
                    <Button
                      color="red.600"
                      title={
                        data.isAdmin ? "Admin can't be deleted" : "Delete User"
                      }
                      border={"2px"}
                      borderStyle={"dotted"}
                      borderColor="red.500"
                      disabled={data.isAdmin}
                      onClick={() => DeleteUserConfirmation(data)}
                    >
                      Delete User
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </>
    
  );
};

export default Admin;
