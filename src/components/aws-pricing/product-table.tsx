'use client';

import { useState, useEffect } from 'react';
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
import {
  Search,
  Filter,
  Info,
  CircleChevronLeft,
  CircleChevronRight,
} from 'lucide-react';
import { AWSPrincingApiResponse, Product } from '@/lib/interfaces';
import { filterAndSortProducts, getEngineColor } from '@/lib/utils';
import ProductDetailPage from './product-detail-page';
import { motion } from 'framer-motion';

type ProductTableProps = {
  response: AWSPrincingApiResponse;
};

export default function ProductTable({ response }: ProductTableProps) {
  const [products] = useState(() => response.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [engineFilter, setEngineFilter] = useState<string>('all');
  const [memoryFilter, setMemoryFilter] = useState<string>('all');
  const itemsPerPage = 10; // Cantidad de items por página
  const [currentPage, setCurrentPage] = useState(1);

  const { onOpen } = useDisclosure();

  // Filter products based on search term and filters
  useEffect(() => {
    const result = filterAndSortProducts(
      Object.values(products),
      searchTerm,
      engineFilter,
      memoryFilter
    );
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, engineFilter, memoryFilter, products]);

  // Get unique engines and regions for filters, delete empty values and sort them
  const engines = [
    'all',
    ...[
      ...new Set(
        Object.values(products).map(
          (product) => product.attributes.databaseEngine
        )
      ),
    ]
      .filter((engine) => !!engine)
      .sort(),
  ];
  const memories = [
    'all',
    ...[
      ...new Set(
        Object.values(products).map((product) => product.attributes.memory)
      ),
    ]
      .filter((engine) => !!engine)
      .sort()
      .reverse(),
  ];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Divide data in pages
  const paginatedData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const pageTransition = {
    hidden: { opacity: 0, x: -100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.3,
      },
    },
  };

  const AnimatedButton = motion(Button);

  return (
    <motion.div
      variants={pageTransition}
      initial='hidden'
      animate='show'
      exit='exit'
    >
      <Box maxW='7xl' mx='auto' px={{ base: '6', md: '8', xl: '12' }} py='6'>
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

                <TableContainer
                  borderWidth='1px'
                  borderRadius='lg'
                  overflowX={{ base: 'auto', md: 'hidden' }}
                >
                  <Table
                    variant='simple'
                    size='sm'
                    fontSize={{ base: 'xs', md: 'sm' }}
                  >
                    <Thead>
                      <Tr height={'50px'}>
                        <Th>Instance Type</Th>
                        <Th display={{ base: 'none', sm: 'table-cell' }}>
                          Engine
                        </Th>
                        <Th display={{ base: 'none', md: 'table-cell' }}>
                          Region
                        </Th>
                        <Th display={{ base: 'none', md: 'table-cell' }}>
                          vCPU
                        </Th>
                        <Th display={{ base: 'none', lg: 'table-cell' }}>
                          Memory
                        </Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <motion.tbody
                      variants={tableVariants}
                      initial='hidden'
                      animate='show'
                    >
                      {paginatedData.map((product) => (
                        <motion.tr
                          key={product.sku}
                          variants={rowVariants}
                          whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.2 },
                            backgroundColor: 'rgba(37, 33, 33, 0.05)',
                          }}
                        >
                          <Td fontWeight='medium'>
                            {product.attributes.instanceType}
                          </Td>
                          <Td display={{ base: 'none', sm: 'table-cell' }}>
                            <Badge
                              colorScheme={getEngineColor(
                                product.attributes.databaseEngine as string
                              )}
                            >
                              {product.attributes.databaseEngine}
                            </Badge>
                          </Td>
                          <Td display={{ base: 'none', md: 'table-cell' }}>
                            {product.attributes.regionCode}
                          </Td>
                          <Td display={{ base: 'none', md: 'table-cell' }}>
                            {product.attributes.vcpu}
                          </Td>
                          <Td display={{ base: 'none', lg: 'table-cell' }}>
                            {product.attributes.memory}
                          </Td>
                          <Td>
                            <AnimatedButton
                              size={{ base: 'xs', md: 'sm' }}
                              colorScheme='blue'
                              leftIcon={<Info size={16} />}
                              onClick={() => handleViewDetails(product)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              Details
                            </AnimatedButton>
                            {/* <Button
                            size={{ base: 'xs', md: 'sm' }}
                            colorScheme='blue'
                            leftIcon={<Info size={16} />}
                            onClick={() => handleViewDetails(product)}
                          >
                            Details
                          </Button> */}
                          </Td>
                        </motion.tr>
                      ))}
                    </motion.tbody>
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
                <CircleChevronLeft />
              </Button>

              {currentPage > 3 && (
                <>
                  <Button onClick={() => handlePageChange(1)}>1</Button>
                  {currentPage > 4 && <Text>...</Text>}
                </>
              )}

              {/* Show close pages */}
              {Array.from({ length: 4 }, (_, i) => currentPage - 2 + i)
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
                <CircleChevronRight />
              </Button>
            </HStack>

            <Card>
              <CardBody>
                <Heading size='md' mb='4'>
                  Pricing Information
                </Heading>
                <Text mb='2'>
                  The prices shown are for on-demand instances and do not
                  include additional costs such as storage, data transfer, or
                  backup.
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
      </Box>
    </motion.div>
  );
}
