import React, { useRef, useState } from 'react';
import './checkout.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid =
      !isEmpty(enteredPostal) && isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  return (
    <form className="forms" onSubmit={confirmHandler}>
      <div  className={`${formInputsValidity.name ? '' : 'invalid'}`}>
        <label htmlFor='name'>Your Name</label><br/>
        <input type='text' id='name' ref={nameInputRef} className="checkout" />
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div  className={`${formInputsValidity.street ? '' : 'invalid'}`}>
        <label htmlFor='street'>Street</label><br/>
        <input type='text' id='street' ref={streetInputRef} className="checkout"/>
        {!formInputsValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div  className={`${formInputsValidity.postal ? '' : 'invalid'}`}>
        <label htmlFor='postal'>Postal Code</label><br/>
        <input type='text' id='postal' ref={postalInputRef} className="checkout"/>
        {!formInputsValidity.postal && (
          <p>Please enter a valid postal code (5 characters long).</p>
        )}
      </div>
      <div  className={`${formInputsValidity.city ? '' : 'invalid'}`}>
        <label htmlFor='city'>City</label><br/>
        <input type='text' id='city' ref={cityInputRef} className="checkout"/>
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className="act">
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
