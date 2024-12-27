import { useState } from "react";
import { DB } from "../data-providers/Server";
import { useNavigate } from "react-router-dom";

function CreateIngredient() {
  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      setSuccessMessage("Title cannot be empty.");
      return;
    }

    const updatedProducts = await DB.createIngredient(title);

    setSuccessMessage(`Product "${title}" created successfully!`);
    setTitle("");
  };

  return (
    <div className="create-ingredient-page">
      <h1>Create New Ingredient</h1>
      <form className="create-ingredient__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter ingredient title"
          value={title}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {successMessage && (
        <div className="create-ingredient__success-message">
          <p>{successMessage}</p>
          <button onClick={() => navigate("/products")}>Go to products page</button>
        </div>
      )}
    </div>
  );
}

export default CreateIngredient;
