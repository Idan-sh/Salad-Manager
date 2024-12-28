import { Ingredient, Product } from "../data-providers/Server";

interface ProductIngredientsProps {
  products: Product[];
  ingredients: Ingredient[];
}

function ProductIngredients({ ingredients, products }: ProductIngredientsProps) {
  const getProductNameById = (id: number) => {
    const product = products.find((prod) => prod.id === id);
    return product ? product.title : `ID: ${id}`; // Showing the ID of the product if failed to find the product's name by its ID
  };

  return (
    <ul className="product-ingredients">
      {ingredients.map((ingredient) => (
        <li key={ingredient.product_id}>
          {ingredient.quantity} x {getProductNameById(ingredient.product_id)}
        </li>
      ))}
    </ul>
  );
}

export default ProductIngredients;
