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
