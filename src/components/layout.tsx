'use client';

import { ReactNode } from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.50', 'gray.900')}>
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Mobile nav */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        position='fixed'
        top='4'
        left='4'
        zIndex='1'
        icon={<Menu />}
      />

      {/* Main content */}
      <Box ml={{ base: 0, md: 60 }} p='4' pt={{ base: 12, md: 4 }}>
        {children}
      </Box>
    </Box>
  );
}
