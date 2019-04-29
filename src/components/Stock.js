import React from 'react'

// Calling props.stock.name VS props.name (look at the nesting of your data)
// Updated lines 11 & 12

// do not need a props.stock on functions

const Stock = (props) => (
  
  <div>

    <div className="card" onClick={event => props.handleClick(props.stock)}>
      <div className="card-body">
        <h5 className="card-title">{props.stock.name}</h5>
        <p className="card-text">{props.stock.price}</p>
      </div>
    </div>

  </div>
);

export default Stock
