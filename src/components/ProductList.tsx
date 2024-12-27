import { Product } from "../data-providers/Server";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  paginatedProducts: Product[];
  onToggleStockClick: (id: number) => Promise<void>;
}

function ProductList({ products, paginatedProducts, onToggleStockClick }: ProductListProps) {
  return (
    <ul className="product-list">
      {paginatedProducts.map((product) => (
        <li key={product.id}>
          <ProductCard
            onToggleStockClick={onToggleStockClick}
            products={products}
            product={product}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
