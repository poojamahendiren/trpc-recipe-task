
import React, { useEffect, useState, useContext } from 'react';
import Card from '../layoutComponents/Card';
import MealItemForm from './MealItemForm';
import CartContext from './cart-context';
import { trpc } from '../index';
import './availablemeals.css';

const AvailableMeals = () => {
  const [recipes, setRecipes] = useState([]);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const recipeList = await trpc.recipe.recipeList.query();
    setRecipes(recipeList);
  };

  const addToCartHandler = (id, amount) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    if (recipe) {
      cartCtx.addItem({
        id: recipe.id,
        name: recipe.name,
        amount: amount,
        price: recipe.price,
      });
    }
  };

  return (
    <section className="meals-food">
      <Card>
        <ul>
          {recipes.map((recipe) => (
            <li className="meallistt" key={recipe.id}>
              <div>
                <h3>{recipe.name}</h3>
                <div className="descriptionn">{recipe.description}</div>
                <div className="pricee">{`$${recipe.price.toFixed(2)}`}</div>
              </div>
              <div>
                <MealItemForm id={recipe.id} onAddToCart={addToCartHandler} />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
