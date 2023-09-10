import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  ChakraProvider,
  Heading,
  Image,
} from '@chakra-ui/react';
import { loginWithPassword, onLoginSuccessCallback } from './auth';
import './bayun';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <ChakraProvider>
      <Box
        p={4}
        maxW="md"
        mx="auto"
        mt={16}
        bgGradient="linear(to-r, teal.300, teal.500)"
        borderRadius="md"
        boxShadow="md"
        borderWidth="1px"
        borderColor="teal.600"
      >
        <Box textAlign="center">
          <Heading as="h2" size="lg" color="white">
            Welcome!
          </Heading>
        </Box>
        <VStack spacing={4} align="center" p={4}>
          <form>
            <FormControl>
              <FormLabel color="white">Company Name</FormLabel>
              <Input type="text" name="companyName" />
            </FormControl>
            <FormControl>
              <FormLabel color="white">Company Employee ID</FormLabel>
              <Input type="text" name="companyEmployeeId" />
            </FormControl>
            <FormControl>
              <FormLabel color="white">Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            {/* <Button
              type="submit"
              colorScheme="teal"
              onClick={loginWithPassword}
              w="full"
              mt={5}
            >
              Login
            </Button> */}
            <Link to='/PeriodTrackerApp'>
            <Button
              type="submit"
              colorScheme="teal"
              onClick={onLoginSuccessCallback}
              w="full"
              mt={5}
            >
              Login
            </Button>
            </Link>
          </form>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Login;
