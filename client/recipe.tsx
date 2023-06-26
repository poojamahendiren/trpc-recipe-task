

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { trpc } from './index';
import RecipeDetails from './recipedetails';



const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientForm, setIngredientForm] = useState({
    name: '',
    quantity: 0,
    unit: '',
    recipeId: 0,
  });
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const ingredientList = await trpc.ingredients.ingredientList.query();
    setIngredients(ingredientList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert quantity and recipeId values to numbers
    const updatedValue = name === 'quantity' || name === 'recipeId' ? parseInt(value, 10) : value;

    setIngredientForm((prevForm) => ({
      ...prevForm,
      [name]: updatedValue,
    }));
  };

  const handleCheckboxChange = (ingredientId) => {
    setSelectedIngredientId(ingredientId);

    // Retrieve selected ingredient data
    const selectedIngredient = ingredients.find((ingredient) => ingredient.id === ingredientId);

    // Set the ingredient data in the form
    setIngredientForm({
      name: selectedIngredient.name,
      quantity: selectedIngredient.quantity,
      unit: selectedIngredient.unit,
      recipeId: selectedIngredient.recipeId,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if it's an update or add operation
    if (selectedIngredientId) {
      // Perform update operation
      await trpc.ingredients.updateIngredient.mutate({
        id: selectedIngredientId,
        ...ingredientForm,
      });
    } else {
      // Perform add operation
      await trpc.ingredients.createIngredient.mutate(ingredientForm);
    }

    // Clear the form and refresh the ingredient list
    setIngredientForm({
      name: '',
      quantity: 0,
      unit: '',
      recipeId: 0,
    });
    setSelectedIngredientId(null);
    fetchData();
  };

  const handleDelete = async (ingredientId) => {
    await trpc.ingredients.deleteIngredient.mutate(ingredientId);
    fetchData();
  };

  return (
    <div>
      <h4>Ingredients</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>RecipeId</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.id}</td>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.unit}</td>
              <td>{ingredient.recipeId}</td>
              <td>
                <input
                  type="checkbox"
                  checked={ingredient.id === selectedIngredientId}
                  onChange={() => handleCheckboxChange(ingredient.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Update/Add Ingredients</h4>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={ingredientForm.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={ingredientForm.quantity}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Unit:
          <input type="text" name="unit" value={ingredientForm.unit} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          RecipeId:
          <input
            type="number"
            name="recipeId"
            value={ingredientForm.recipeId}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">{selectedIngredientId ? 'Update' : 'Add'}</button>
      </form>

      <h4>Delete Ingredient</h4>
      {selectedIngredientId && (
        <button onClick={() => handleDelete(selectedIngredientId)}>Delete</button>
      )}
      <div>
      <RecipeDetails/>
      </div>
      
    </div>
    

  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
