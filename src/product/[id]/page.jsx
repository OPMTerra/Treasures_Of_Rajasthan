import ProductContent from './ProductContent';

export default function ProductPage({ params }) {
  return <ProductContent productId={params.id} />;
}