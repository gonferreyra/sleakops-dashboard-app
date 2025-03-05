'use client';

import { fetchItems } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import ProductTable from '@/components/aws-pricing/product-table';
import Loading from './loading';
import NotFound from '@/components/aws-pricing/not-found';

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  return <ProductTable response={data} />;
}
