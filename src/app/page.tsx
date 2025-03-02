'use client';

import Layout from '@/components/layout';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { TrendingUp, Users, FileText, DollarSign } from 'lucide-react';

export default function Home() {
  return (
    <Layout>
      <Box maxW='7xl' mx='auto' px={{ base: '4', md: '8', lg: '12' }} py='6'>
        <Heading mb='6'>Dashboard</Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing='6' mb='8'>
          <StatCard
            title='Revenue'
            value='$34,500'
            change='+14%'
            icon={DollarSign}
            accentColor='green.500'
          />
          <StatCard
            title='Users'
            value='2,450'
            change='+21%'
            icon={Users}
            accentColor='blue.500'
          />
          <StatCard
            title='Documents'
            value='1,280'
            change='+7%'
            icon={FileText}
            accentColor='purple.500'
          />
          <StatCard
            title='Growth'
            value='24.5%'
            change='+3.2%'
            icon={TrendingUp}
            accentColor='orange.500'
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing='6'>
          <Card>
            <CardHeader>
              <Heading size='md'>Recent Activity</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your recent activity and performance
                metrics.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View All</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Heading size='md'>Upcoming Tasks</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Check your upcoming tasks and scheduled meetings for the week.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View Calendar</Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Box>
    </Layout>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  accentColor: string;
}

function StatCard({ title, value, change, icon, accentColor }: StatCardProps) {
  return (
    <Card>
      <CardBody>
        <Flex justify='space-between' align='center'>
          <Stat>
            <StatLabel>{title}</StatLabel>
            <StatNumber>{value}</StatNumber>
            <StatHelpText
              color={change.startsWith('+') ? 'green.500' : 'red.500'}
            >
              {change}
            </StatHelpText>
          </Stat>
          <Box p='3' bg={accentColor} borderRadius='full' color='white'>
            <Icon as={icon} boxSize='5' />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
