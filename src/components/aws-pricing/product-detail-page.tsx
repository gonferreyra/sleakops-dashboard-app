'use client';
import { Product, Terms } from '@/lib/interfaces';
import { formatPrice } from '@/lib/utils';
import {
  Box,
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
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';

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

export default function ProductDetailPage({
  product,
  terms,
  onBack,
}: ProductDetailPageProps) {
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
    <Box>
      <Button onClick={onBack} mb={4}>
        Back
      </Button>
      <Flex flexDir='column' justifyContent='center' alignItems='center'>
        <Card>
          <CardHeader>
            <Heading size='md'>Product SKU {product.sku}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='1'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Engine
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {product.attributes.databaseEngine}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Instance Type
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {product.attributes.instanceType}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Region
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {product.attributes.regionCode}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Heading size='md' mt={4}>
          Pricing Options
        </Heading>

        <Flex
          justifyContent={{ base: 'flex-start', md: 'center' }}
          flexWrap='wrap'
          gap={6}
          mt='6'
        >
          {allPrices.map((price, index) => (
            <Card key={index} w='320px'>
              <CardHeader>
                <Text size={{ base: 'md', md: 'xl' }}>
                  <Badge
                    variant='subtle'
                    colorScheme={price.type === 'OnDemand' ? 'green' : 'orange'}
                    fontSize={{ base: 14, md: 18 }}
                    borderRadius='lg'
                    padding={2}
                  >
                    {price.type}
                  </Badge>
                </Text>
              </CardHeader>
              <CardBody className='flex flex-col'>
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
                      Dedicated vCPU cores
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
                      ${Number(price.price).toFixed(2)}
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
                    bg={useColorModeValue('#151f21', 'gray.900')}
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
            </Card>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
