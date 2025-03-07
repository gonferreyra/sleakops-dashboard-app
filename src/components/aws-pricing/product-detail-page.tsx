'use client';
import { cardVariants, containerVariants } from '@/lib/framer';
import { Product, Terms } from '@/lib/interfaces';
import { formatPrice, getEngineColor } from '@/lib/utils';
import {
  Heading,
  Text,
  Button,
  Card,
  Stack,
  Flex,
  CardHeader,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

type ProductDetailPageProps = {
  product: Product;
  terms: Terms;
  onBack: () => void;
};

interface PriceDimension {
  description: string;
  unit: string;
  pricePerUnit: {
    USD: string;
  };
}

interface TermAttributes {
  LeaseContractLength?: string;
  PurchaseOption?: string;
  OfferingClass?: string;
}

interface Offer {
  priceDimensions: Record<string, PriceDimension>;
  effectiveDate: string;
  termAttributes?: TermAttributes;
}

const AnimatedBadge = motion.create(Badge);
const AnimatedCard = motion.create(Card);

export default function ProductDetailPage({
  product,
  terms,
  onBack,
}: ProductDetailPageProps) {
  const hoverBg = useColorModeValue('#151f21', 'gray.900');

  if (!product) return <Text>Product not found</Text>;

  const getPriceDetails = (sku: string, type: 'OnDemand' | 'Reserved') => {
    const termData = terms?.[type]?.[sku];
    if (!termData) return [];

    // Convert object to array
    const offers = Object.values(termData) as Offer[];

    return offers.flatMap((offer) => {
      const prices = Object.values(offer.priceDimensions);

      return prices.map((price) => {
        // Create base object
        const basePrice = {
          type,
          description: price.description,
          price: formatPrice(price.pricePerUnit.USD),
          unit: price.unit,
          effectiveDate: offer.effectiveDate,
          leaseContractLength: '',
          purchaseOption: '',
          offeringClass: '',
        };

        // Add specific attributes to reserved instances
        if (type === 'Reserved' && offer.termAttributes) {
          return {
            ...basePrice,
            leaseContractLength: offer.termAttributes.LeaseContractLength,
            purchaseOption: offer.termAttributes.PurchaseOption,
            offeringClass: offer.termAttributes.OfferingClass,
          };
        }

        return basePrice;
      });
    });
  };

  const onDemandPrices = getPriceDetails(product.sku, 'OnDemand');
  const reservedPrices = getPriceDetails(product.sku, 'Reserved');
  const allPrices = [...onDemandPrices, ...reservedPrices];

  return (
    <Flex flexDirection='column'>
      <Button onClick={onBack} ml={'auto'}>
        Back
      </Button>
      <VStack spacing={6} textAlign='center' my='4'>
        <Heading as='h1' fontSize='4xl'>
          Plans that fit your need
        </Heading>
        <Text fontSize='lg' color={'gray.500'}>
          Check out all the options we have with
          <Badge
            p='1'
            rounded='full'
            mx='1'
            colorScheme={getEngineColor(
              product.attributes.databaseEngine as string
            )}
          >
            {product.attributes.databaseEngine}
          </Badge>
          engine and
          <AnimatedBadge
            p='1'
            rounded='full'
            mx='1'
            colorScheme={'red'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {product.attributes.instanceType}
          </AnimatedBadge>
          instance and get started today by selecting one. Cancel at anytime.
        </Text>
      </VStack>
      <Flex flexDir='column' justifyContent='center' alignItems='center'>
        <Heading size='md' mt={4}>
          Pricing Options
        </Heading>

        <Flex
          as={motion.div}
          variants={containerVariants}
          initial='hidden'
          animate='show'
          justifyContent={{ base: 'flex-start', md: 'center' }}
          flexWrap='wrap'
          gap={6}
          mt='6'
        >
          {allPrices.map((price, index) => (
            <AnimatedCard
              w='320px'
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { type: 'spring', stiffness: 300 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <CardHeader>
                <Text size={{ base: 'md', md: 'xl' }}>
                  <Badge
                    variant='subtle'
                    colorScheme={price.type === 'OnDemand' ? 'green' : 'blue'}
                    fontSize={{ base: 14, md: 18 }}
                    borderRadius='lg'
                    padding={2}
                  >
                    {price.type}
                  </Badge>
                </Text>
              </CardHeader>
              <CardBody display='flex' flexDirection='column'>
                <Text
                  mb={{ base: 2, md: 4 }}
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  {price.description}
                </Text>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={{ base: 1, md: 4 }}
                  mb={{ base: 2, md: 4 }}
                >
                  <Stat>
                    <StatLabel fontSize={{ base: 12, md: 14 }}>vCPU</StatLabel>
                    <StatNumber fontSize={{ base: 20, md: 24 }}>
                      {product.attributes.vcpu}
                    </StatNumber>
                    <StatHelpText fontSize={{ base: 12, md: 14 }}>
                      Dedicated cores
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel fontSize={{ base: 12, md: 14 }}>
                      Memory
                    </StatLabel>
                    <StatNumber fontSize={{ base: 20, md: 24 }}>
                      {product.attributes.memory}
                    </StatNumber>
                    <StatHelpText fontSize={{ base: 12, md: 14 }}>
                      RAM available
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel fontSize={{ base: 12, md: 14 }}>
                      Deployment option
                    </StatLabel>
                    <StatNumber fontSize={{ base: 20, md: 24 }}>
                      {product.attributes.deploymentOption}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel fontSize={{ base: 12, md: 14 }}>Price</StatLabel>
                    <StatNumber fontSize={{ base: 20, md: 24 }}>
                      ${' '}
                      {Number(price.price).toLocaleString(undefined, {
                        minimumFractionDigits:
                          price.price.toString().length > 6 ? 0 : 2,
                        maximumFractionDigits:
                          price.price.toString().length > 6 ? 0 : 2,
                      })}
                    </StatNumber>
                    <StatHelpText fontSize={{ base: 12, md: 14 }}>
                      {price.unit}
                    </StatHelpText>
                  </Stat>
                </SimpleGrid>
                <Stack spacing='3' mb='4' className='mt-auto'>
                  {price.type === 'Reserved' && (
                    <>
                      <Text fontWeight='bold'>Additional Features:</Text>
                      <Flex align='center'>
                        <Badge colorScheme='green' mr='2'>
                          Lease length
                        </Badge>
                        <Text>{price.leaseContractLength}</Text>
                      </Flex>
                      <Flex align='center'>
                        <Badge colorScheme='purple' mr='2'>
                          Purchase Option
                        </Badge>
                        <Text>{price.purchaseOption}</Text>
                      </Flex>
                      <Flex align='center'>
                        <Badge colorScheme='blue' mr='2'>
                          Offering class
                        </Badge>
                        <Text>{price.offeringClass}</Text>
                      </Flex>
                    </>
                  )}
                  <Button
                    w={'full'}
                    mt={'auto'}
                    bg={hoverBg}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    GET IT NOW
                  </Button>
                </Stack>
              </CardBody>
            </AnimatedCard>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
