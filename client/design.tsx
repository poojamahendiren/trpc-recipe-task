import React, {useState} from 'react'
import ReactDOM from 'react-dom';
import "./design.css"
import HeaderCartButton from './components/HeaderCartButton';
import mealsImage from "./assets/meals.jpg"
import Meals from "./components/Meals"
import CartProvider from './store/CartProvider';
import Cart from "./components/Cart"
import Header from "./components/Header"


const Design = (props) => {

  const [cartIsShown, setCartIsShown] =  useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    
      <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
    <Header onShowCart={showCartHandler}/>
        
      <main>
        <Meals />
      </main>
      </CartProvider>
    
  )
}

export default Design

ReactDOM.createRoot(document.getElementById('app')).render(<Design />);


