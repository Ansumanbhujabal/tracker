import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  ChakraProvider,
} from '@chakra-ui/react';
import {registerWithPassword} from './auth';
import './bayun';

function Registration() {

  return (
    <ChakraProvider>
    <Box p={4}>
      <VStack spacing={4} align="center">
        <form >
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
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Is Company Owned Email?</FormLabel>
            <Input
              type="checkbox"
              name="isCompanyOwnedEmail"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal"  onClick={registerWithPassword}>
            Register
          </Button>
        </form>
      </VStack>
    </Box>
    </ChakraProvider>
  );
}

export default Registration;
