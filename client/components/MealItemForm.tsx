

import React, { useRef, useState } from 'react';
import './mealItemForm.css';

const MealItemForm = (props) => {
  const [amount, setAmount] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const incrementAmount = () => {
    const newAmount = amount + 1;
    if (newAmount <= 5) {
      setAmount(newAmount);
      setAmountIsValid(true);
    }
  };

  const decrementAmount = () => {
    const newAmount = amount - 1;
    if (newAmount >= 1) {
      setAmount(newAmount);
      setAmountIsValid(true);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (amount < 1 || amount > 5) {
      setAmountIsValid(false);
      return;
    }

    setAmountIsValid(true);
    props.onAddToCart(props.id, amount);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form-input">
        <div className="input-container">
          <label htmlFor={`amount_${props.id}`} style={{ fontSize: '1em', padding: '.5em .5em .5em 0', fontWeight: '600' }}>
            Amount
          </label>

          <input
            className="meal-input"
            ref={amountInputRef}
            type="number"
            min="1"
            max="5"
            step="1"
            value={amount}
            readOnly
            style={{ margin: '.4em' }}
          />
          <button type="button" onClick={decrementAmount}>
            -
          </button>

          <button type="button" onClick={incrementAmount}>
            +
          </button>
        </div>

        <div>
          <button type="submit" className="btn-sub">
            + Add
          </button>
        </div>
      </div>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
