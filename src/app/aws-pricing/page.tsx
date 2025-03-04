import { fetchItems } from '@/lib/actions';
import { AWSPrincingApiResponse } from '@/lib/interfaces';
import ProductTable from '@/components/aws-pricing/product-table';

export default async function Page() {
  const response: AWSPrincingApiResponse = await fetchItems();

  return <ProductTable response={response} />;
}
