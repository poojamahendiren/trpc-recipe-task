import React from 'react';

import  './Card.css';

const Card = (props) => {
  return <div className="cardd">{props.children}</div>;
};

export default Card;