import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { trpc } from './index';

const RecipeDetails = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeForm, setRecipeForm] = useState({
    name: '',
    description: '',
    cookingInstructions: '',
    customerId: 0,
  });
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const recipeList = await trpc.recipe.recipeList.query();
    setRecipes(recipeList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (recipeId) => {
    setSelectedRecipeId(recipeId);

    // Retrieve selected recipe data
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

    // Set the recipe data in the form
    setRecipeForm({
      name: selectedRecipe.name,
      description: selectedRecipe.description,
      cookingInstructions: selectedRecipe.cookingInstructions,
      customerId: selectedRecipe.customerId,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Convert customerId to a number
    const customerId = Number(recipeForm.customerId);

    // Check if it's an update or add operation
    if (selectedRecipeId) {
      // Perform update operation
      await trpc.recipe.updateRecipe.mutate({
        id: selectedRecipeId,
        ...recipeForm,
        customerId,
      });
    } else {
      // Perform add operation
      await trpc.recipe.createRecipe.mutate({
        ...recipeForm,
        customerId,
      });
    }

    // Clear the form and refresh the recipe list
    setRecipeForm({
      name: '',
      description: '',
      cookingInstructions: '',
      customerId: 0,
    });
    setSelectedRecipeId(null);
    fetchData();
  };

  // const handleDelete = async (recipeId) => {
  //   await trpc.recipe.deleteRecipe.mutate(recipeId);
  //   fetchData();
  // };

  const handleDelete = async (recipeId) => {
    await trpc.recipe.deleteRecipe.mutate({ id: recipeId });
    fetchData();
  };

  return (
    <div>
      <h4>Recipes</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Cooking Instructions</th>
            <th>Customer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td>{recipe.cookingInstructions}</td>
              <td>{recipe.customerId}</td>
              <td>
                <input
                  type="checkbox"
                  checked={recipe.id === selectedRecipeId}
                  onChange={() => handleCheckboxChange(recipe.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Update/Add Recipe</h4>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={recipeForm.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={recipeForm.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Cooking Instructions:
          <input
            type="text"
            name="cookingInstructions"
            value={recipeForm.cookingInstructions}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Customer ID:
          <input
            type="number"
            name="customerId"
            value={recipeForm.customerId}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">{selectedRecipeId ? 'Update' : 'Add'}</button>
      </form>

      <h4>Delete Recipe</h4>
      {selectedRecipeId && (
        <button onClick={() => handleDelete(selectedRecipeId)}>Delete</button>
      )}
    </div>
  );
};

export default RecipeDetails;
