import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, ChakraProvider, } from '@chakra-ui/react';
import './auth';
import './bayun';

function Login() {

  return (
    <ChakraProvider>
    <Box p={4}>
      <VStack spacing={4} align="center">
        <form>
          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="companyName"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Company Employee ID</FormLabel>
            <Input
              type="text"
              name="companyEmployeeId"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" onChange="loginWithPassword()">
            Login
          </Button>
        </form>
      </VStack>
    </Box>
    </ChakraProvider>
  );
}

export default Login;
