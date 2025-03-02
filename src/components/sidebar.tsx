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
} from '@chakra-ui/react';
import {
  Home,
  // Settings,
  // Users,
  // BarChart,
  // FileText,
  // HelpCircle,
  // Database,
  // Server,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LinkItemProps {
  name: string;
  icon: any;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: Home, path: '/' },
  // { name: 'Dashboard', icon: BarChart, path: '/dashboard' },
  // { name: 'AWS RDS Pricing', icon: Database, path: '/aws-pricing' },
  // { name: 'RDS Products', icon: Server, path: '/rds-products' },
  // { name: 'Users', icon: Users, path: '/users' },
  // { name: 'Documents', icon: FileText, path: '/documents' },
  // { name: 'Settings', icon: Settings, path: '/settings' },
  // { name: 'Help', icon: HelpCircle, path: '/help' },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontWeight='bold'>
          NextApp
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Stack spacing={4} mx={4}>
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
      </Stack>
    </Box>
  );
};

interface NavItemProps extends BoxProps {
  icon: any;
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
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            as={icon}
            color={isActive ? 'brand.500' : 'gray.500'}
            _groupHover={{
              color: 'brand.500',
            }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
