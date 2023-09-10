import React, { useState, useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useColorMode,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { readFileAsText, downloadFile } from './auth';

const UserAccountDrawer = ({ isOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>User Account</DrawerHeader>

        <DrawerBody>
          <input
            type="file"
            accept=".pdf, .jpg, .png"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            ref={fileInputRef}
            id="file"
          />

          {selectedFile ? (
            <Alert status="success" mb={4}>
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Your file was successfully uploaded:</AlertTitle>
                {selectedFile.name}
              </Box>
            </Alert>
          ) : (
            <Button
              colorScheme="teal"
              w="100%"
              mb={3}
              onClick={triggerFileInput}
            >
              Upload Health Report
            </Button>
          )}

          <Button
            colorScheme="teal"
            w="100%"
            mb={3}
            onClick={downloadFile}
            isDisabled={!selectedFile}
            style={{
              backgroundColor: 'teal',
              color: 'white',
              fontWeight: 'bold',
              _hover: { backgroundColor: 'teal.600' },
            }}
          >
            {selectedFile ? 'Download Locked File' : 'Select a File First'}
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
