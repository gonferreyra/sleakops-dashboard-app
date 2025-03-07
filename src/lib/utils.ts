import { Product } from './interfaces';

// Helper function to get color for engine badge
export function getEngineColor(engine: string): string {
  const colorMap: Record<string, string> = {
    MySQL: 'blue',
    PostgreSQL: 'purple',
    MariaDB: 'orange',
    Oracle: 'red',
    'SQL Server': 'green',
    'Aurora MySQL': 'teal',
    'Aurora PostgreSQL': 'cyan',
  };

  return colorMap[engine] || 'gray';
}

// Function to format price
export const formatPrice = (price: string): string => {
  return price ? parseFloat(price).toFixed(3) : 'N/A';
};

export const filterAndSortProducts = (
  products: Product[],
  searchTerm: string,
  engineFilter: string,
  memoryFilter: string
): Product[] => {
  let result = [...products];

  // Apply search term filter
  if (searchTerm) {
    result = result.filter(
      (product) =>
        product.attributes?.instanceType
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.attributes?.databaseEngine
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.attributes?.memory
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.attributes?.vcpu
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      // ||
      // product.attributes?.regionCode
      //   ?.toLowerCase()
      //   .includes(searchTerm.toLowerCase())
    );
  }

  // Apply engine filter
  if (engineFilter !== 'all') {
    result = result.filter(
      (product) => product.attributes.databaseEngine === engineFilter
    );
  }

  // Apply memory filter
  if (memoryFilter !== 'all') {
    result = result.filter(
      (product) => product.attributes.memory === memoryFilter
    );
  }

  // Sort products if they have empty fields
  return result.sort((a, b) => {
    const aHasEmptyFields =
      !a.attributes.instanceType || !a.attributes.vcpu || !a.attributes.memory;
    const bHasEmptyFields =
      !b.attributes.instanceType || !b.attributes.vcpu || !b.attributes.memory;

    if (aHasEmptyFields && !bHasEmptyFields) return 1;
    if (!aHasEmptyFields && bHasEmptyFields) return -1;
    return 0;
  });
};
