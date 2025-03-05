'use client';

import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { ShieldCloseIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <Flex justify='center' align='center' h='100vh' rowGap={6}>
      <Box textAlign='center' py={10} px={6}>
        <Box display='inline-block'>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            bg={'red.500'}
            rounded={'50px'}
            w={'55px'}
            h={'55px'}
            textAlign='center'
          >
            <ShieldCloseIcon color={'white'} />
          </Flex>
        </Box>
        <Heading as='h2' size='xl' mt={6} mb={2}>
          Error
        </Heading>
        <Text color={'gray.500'}>
          An error occurred while trying to access the page. Please contact the
          administrator.
        </Text>

        <Button
          mt={10}
          colorScheme='blackAlpha'
          bg={useColorModeValue('#151f21', 'gray.900')}
          variant='solid'
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          onClick={() => router.push('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Flex>
  );
}
