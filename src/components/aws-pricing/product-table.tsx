'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Flex,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Select,
  Button,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Search, Filter, Info } from 'lucide-react';
import { AWSPrincingApiResponse, Product } from '@/lib/interfaces';
import { getEngineColor } from '@/lib/utils';
import ProductDetailPage from './product-detail-page';

type ProductTableProps = {
  response: AWSPrincingApiResponse;
};

export default function ProductTable({ response }: ProductTableProps) {
  const [products, setProducts] = useState(() => response.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [engineFilter, setEngineFilter] = useState<string>('all');
  const [memoryFilter, setMemoryFilter] = useState<string>('all');
  const itemsPerPage = 10; // Cantidad de items por página
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Object.values(products).length / itemsPerPage);

  const { onOpen } = useDisclosure();

  // Filter products based on search term and filters
  useEffect(() => {
    let result = [...Object.values(products)];

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.attributes?.instanceType
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.attributes.databaseEngine
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.attributes?.memory
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.attributes?.vcpu
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply engine filter
    if (engineFilter !== 'all') {
      result = result.filter(
        (product) => product.attributes.databaseEngine === engineFilter
      );
    }

    // Apply region filter
    if (memoryFilter !== 'all') {
      result = result.filter(
        (product) => product.attributes.memory === memoryFilter
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, engineFilter, memoryFilter, products]);

  // Get unique engines and regions for filters
  const engines = [
    'all',
    ...new Set(
      Object.values(products).map(
        (product) => product.attributes.databaseEngine
      )
    ),
  ];
  const memories = [
    'all',
    ...new Set(
      Object.values(products).map((product) => product.attributes.memory)
    ),
  ];

  // Divide data in pages
  const paginatedData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <Box maxW='7xl' mx='auto' px={{ base: '4', md: '8', lg: '12' }} py='6'>
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          terms={response.terms}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <>
          <Heading mb='6'>AWS RDS Pricing</Heading>
          <Card mb='6'>
            <CardBody>
              <Heading size='md' mb='4'>
                Filter RDS Instances
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing='4' mb='6'>
                <Flex align='center'>
                  <Search
                    size={20}
                    color='gray'
                    style={{ marginRight: '8px' }}
                  />
                  <Input
                    placeholder='Search instances...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Flex>
                <Select
                  placeholder='Select engine'
                  value={engineFilter}
                  onChange={(e) => setEngineFilter(e.target.value)}
                  icon={<Filter size={15} />}
                >
                  {engines.map((engine, index) => (
                    <option key={index} value={engine}>
                      {engine === 'all' ? 'All Engines' : engine}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder='Select region'
                  value={memoryFilter}
                  onChange={(e) => setMemoryFilter(e.target.value)}
                  icon={<Filter size={15} />}
                >
                  {memories.map((memory, index) => (
                    <option key={index} value={memory}>
                      {memory === 'all' ? 'All Memories' : memory}
                    </option>
                  ))}
                </Select>
              </SimpleGrid>

              {/* {loading ? (
              <Flex justify='center' align='center' py='10'>
                <Spinner size='xl' color='blue.500' />
                <Text ml='4' fontSize='lg'>
                  Loading RDS pricing data...
                </Text>
              </Flex>
            ) : ( */}

              <TableContainer borderWidth='1px' borderRadius='lg'>
                <Table variant='simple' size='sm'>
                  <Thead>
                    <Tr>
                      <Th>Instance Type</Th>
                      <Th>Engine</Th>
                      <Th>Region</Th>
                      <Th>vCPU</Th>
                      <Th>Memory</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {paginatedData.map((product) => (
                      <Tr key={product.sku}>
                        <Td fontWeight='medium'>
                          {product.attributes.instanceType}
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={getEngineColor(
                              product.attributes.databaseEngine as string
                            )}
                          >
                            {product.attributes.databaseEngine}
                          </Badge>
                        </Td>
                        <Td>{product.attributes.regionCode}</Td>
                        <Td>{product.attributes.vcpu}</Td>
                        <Td>{product.attributes.memory}</Td>
                        <Td>
                          <Button
                            size='sm'
                            colorScheme='blue'
                            leftIcon={<Info size={16} />}
                            onClick={() => handleViewDetails(product)}
                          >
                            Details
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <TableContainer>
                {paginatedData.length === 0 && (
                  <Flex justify='center' py='8'>
                    <Text color='gray.500'>
                      No matching RDS instances found
                    </Text>
                  </Flex>
                )}
              </TableContainer>
            </CardBody>
          </Card>

          {/* Pagination controls */}
          <HStack
            justify='center'
            marginTop='20px'
            marginBottom='20px'
            spacing={2}
          >
            <Button
              isDisabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>

            {currentPage > 3 && (
              <>
                <Button onClick={() => handlePageChange(1)}>1</Button>
                {currentPage > 4 && <Text>...</Text>}
              </>
            )}

            {/* Mostrar páginas cercanas */}
            {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
              .filter((page) => page > 0 && page <= totalPages)
              .map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  colorScheme={currentPage === page ? 'teal' : undefined}
                >
                  {page}
                </Button>
              ))}

            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && <Text>...</Text>}
                <Button onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </Button>
              </>
            )}

            <Button
              isDisabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </HStack>

          <Card>
            <CardBody>
              <Heading size='md' mb='4'>
                Pricing Information
              </Heading>
              <Text mb='2'>
                The prices shown are for on-demand instances and do not include
                additional costs such as storage, data transfer, or backup.
              </Text>
              <Text mb='2'>
                For production workloads, consider using reserved instances to
                save up to 72% compared to on-demand pricing.
              </Text>
              <Button colorScheme='blue' mt='4'>
                View AWS RDS Documentation
              </Button>
            </CardBody>
          </Card>
        </>
      )}

      {/* {error && (
          <Alert status='error' mb='6'>
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}
    </Box>
  );
}
