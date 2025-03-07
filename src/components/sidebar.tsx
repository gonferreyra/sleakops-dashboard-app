'use client';

import {
  Box,
  Flex,
  Text,
  CloseButton,
  BoxProps,
  useColorModeValue,
  Stack,
  Icon,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { Home, Database, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LinkItemProps {
  name: string;
  icon: LucideIcon;
  path: string;
}

export const MotionText = motion.create(Text);

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'AWS RDS', icon: Database, path: '/aws-pricing' },
];
interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const pathname = usePathname();
  const { colorMode, toggleColorMode } = useColorMode();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', lg: 52 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex
        h='20'
        alignItems='center'
        mx='8'
        justifyContent='space-between'
        margin='4'
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className='w-full mx-auto'
        >
          <Image
            src='/sleakops-logo.png'
            width={100}
            height={50}
            alt='logo'
            className='mx-auto'
          />
        </motion.div>
        <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>
      <Stack
        spacing={2}
        mx={2}
        as={motion.div}
        variants={container}
        initial='hidden'
        animate='show'
      >
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            path={link.path}
            isActive={pathname === link.path}
          >
            {link.name}
          </NavItem>
        ))}
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'light'}
        </Button>
      </Stack>
    </Box>
  );
};

interface NavItemProps extends BoxProps {
  icon: LucideIcon;
  path: string;
  isActive?: boolean;
  children: React.ReactNode;
}

const NavItem = ({ icon, path, isActive, children, ...rest }: NavItemProps) => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        bg={isActive ? 'brand.100' : 'transparent'}
        color={isActive ? 'brand.700' : 'inherit'}
        fontWeight={isActive ? 'medium' : 'normal'}
        _hover={{
          bg: 'brand.100',
          color: 'brand.700',
        }}
        {...rest}
      >
        <motion.div
          variants={{
            hidden: { x: -20, opacity: 0 },
            show: { x: 0, opacity: 1 },
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {icon && (
            <Icon
              mr='2'
              fontSize='16'
              as={icon}
              color={isActive ? 'brand.500' : 'gray.500'}
              _groupHover={{
                color: 'brand.500',
              }}
            />
          )}
          {children}
        </motion.div>
      </Flex>
    </Link>
  );
};
