import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, db } from '../Firebase/firebase';

const SignUp = () => {
    const [emailSignUp, setEmailSignUp] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("");
    const [displayNameSignUp, setdisplayNameSignUp] = useState("");
    
    const SignUpFunc=async()=>{
        try {
            const email = emailSignUp;
            const password = passwordSignUp;
            const displayName=displayNameSignUp
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password,
              displayName
            );
            const user = userCredential.user;
      
            // * Storing the details of user inside of our firebase database;
            const UserCollectionRef = doc(db, "users", user.uid);
            await setDoc(UserCollectionRef, { email, password,displayName });
      
            setEmailSignUp("");
            setPasswordSignUp("");
            console.log("user: ", user);
          } catch (error) {
            console.log("error: ", error);
          }
    }

  return (
    <>
        <Heading textAlign={"center"}>Sign Up</Heading>
      <Box w="30%" m="auto">
      <Input
          type="text"
          placeholder="name"
          value={displayNameSignUp}
          my="2"
          onChange={(e) => setdisplayNameSignUp(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={emailSignUp}
          my="2"
          onChange={(e) => setEmailSignUp(e.target.value)}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          my="2"
          value={passwordSignUp}
          onChange={(e) => setPasswordSignUp(e.target.value)}
        />
        <Button onClick={SignUpFunc}>Sign Up</Button>
        </Box>
    </>
  )
}

export default SignUp