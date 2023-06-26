import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { trpc } from './index';

const RecipeIngredients = ({ recipeId }) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientForm, setIngredientForm] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (recipeId) {
      fetchData();
    }
  }, [recipeId]);

  const fetchData = async () => {
    const ingredientList = await trpc.ingredients.ingredientList.query({ recipeId });
    setIngredients(ingredientList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert quantity and price values to numbers
    const updatedValue = name === 'quantity' || name === 'price' ? parseFloat(value) : value;

    setIngredientForm((prevForm) => ({
      ...prevForm,
      [name]: updatedValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform add operation
    await trpc.ingredients.createIngredient.mutate({
      ...ingredientForm,
      recipeId,
    });

    // Clear the form and refresh the ingredient list
    setIngredientForm({
      name: '',
      quantity: 0,
      price: 0,
    });
    fetchData();
  };

  const handleDelete = async (ingredientId) => {
    await trpc.ingredients.deleteIngredient.mutate(ingredientId);
    fetchData();
  };

  const calculateAmount = (quantity, price) => {
    return quantity * price;
  };

  const calculateTotalAmount = () => {
    return ingredients.reduce((total, ingredient) => {
      const amount = calculateAmount(ingredient.quantity, ingredient.price);
      return total + amount;
    }, 0);
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
            <th>Price</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.id}</td>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.price}</td>
              <td>{calculateAmount(ingredient.quantity, ingredient.price)}</td>
              <td>
                <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Add Ingredient</h4>
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
          Price:
          <input
            type="number"
            name="price"
            value={ingredientForm.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>

      <h4>Total Amount: {calculateTotalAmount()}</h4>
    </div>
  );
};

RecipeIngredients.propTypes = {
  recipeId: PropTypes.number.isRequired,
};

export default RecipeIngredients;
