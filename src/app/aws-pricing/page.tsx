'use client';

import { fetchItems } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import ProductTable from '@/components/aws-pricing/product-table';
import Loading from './loading';

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return <ProductTable response={data} />;
}
