import { IoExtensionPuzzle } from "react-icons/io5";
import { Product } from "../data-providers/Server";
import { useState } from "react";
import ProductIngredients from "./ProductIngredients";

interface ProductCardProps {
  products: Product[]; // All the possible products, used in the ProductIngredients component
  product: Product;
  onToggleStockClick: (id: number) => Promise<void>;
}

function ProductCard({ product, onToggleStockClick, products }: ProductCardProps) {
  const [isIngredientHovered, setIsIngredientHovered] = useState(false);
  const isSalad = product.ingredients.length > 0;

  return (
    <section key={product.id} className={`product-card ${product.in_stock ? "in-stock" : ""}`}>
      <div className="product-card__title">
        <h1>{product.title}</h1>
        <div
          onMouseEnter={() => setIsIngredientHovered(true)}
          onMouseLeave={() => setIsIngredientHovered(false)}
        >
          <span className="product-card__salad-ingredients-icon">
            {isSalad ? <IoExtensionPuzzle size={18} /> : null}
          </span>
          {isIngredientHovered && (
            <ProductIngredients products={products} ingredients={product.ingredients} />
          )}
        </div>
      </div>
      {!isSalad && <button onClick={() => onToggleStockClick(product.id)}>Toggle in stock</button>}
    </section>
  );
}

export default ProductCard;
