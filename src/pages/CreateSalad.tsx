import { useEffect, useState } from "react";
import { DB, Product, Ingredient } from "../data-providers/Server";

function CreateSalad() {
  const [ingredients, setIngredients] = useState<Product[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    DB.getAllIngredientsAsProducts().then((ingredients) => setIngredients(ingredients));
  }, []);

  const toggleIngredient = (productId: number) => {
    setSelectedIngredients((prevSelected) => {
      const exists = prevSelected.some((ingredient) => ingredient.product_id === productId); // Check if the ingredient exists in the previously selected ingredients array

      // If the ingredient was previously selected, choose every selected ingredient beside it
      if (exists) {
        return prevSelected.filter((ingredient) => ingredient.product_id !== productId);
      } else {
        // Else, add the ingredient to the selected ingredients with the quantity of 1 by default
        return [...prevSelected, { product_id: productId, quantity: 1 }];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || selectedIngredients.length === 0) {
      alert("Please provide a title and select at least one ingredient.");
      return;
    }

    await DB.createSalad(title, selectedIngredients);

    alert(`Salad "${title}" created successfully!`);
    setTitle("");
    setSelectedIngredients([]);
  };

  return (
    <div className="create-salad-page">
      <h1>Create a new salad</h1>
      <form className="create-salad__form" onSubmit={handleSubmit}>
        <div className="create-salad__ingredients-buttons">
          {ingredients.map((ingredient) => (
            <button
              type="button"
              key={ingredient.id}
              onClick={() => toggleIngredient(ingredient.id)}
              className={
                selectedIngredients.some((ing) => ing.product_id === ingredient.id) // Check if the current ingredient is selected
                  ? "selected"
                  : ""
              }
            >
              {ingredient.title}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Salad title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateSalad;
