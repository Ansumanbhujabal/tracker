import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useColorMode,
} from '@chakra-ui/react';

const UserAccountDrawer = ({ isOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>User Account</DrawerHeader>

        <DrawerBody>
          <Button colorScheme="teal" w="100%" mb={3}>
            Lock Health Reports
          </Button>
          <Button colorScheme="teal" w="100%" mb={3}>
            Health Assistant
          </Button>
          <Button colorScheme="teal" w="100%" onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UserAccountDrawer;
