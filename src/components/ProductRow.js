import React from "react";

function ProductRow(props) {
  const { name, price, stocked } = props.product; // Extract name and price and stock from props.product
  // if a product is out of stock, it will have the color red;

  const productNameStyle = {
    color: stocked ? "black" : "red",
  };

  return (
    <tr>
      <td style={productNameStyle}>{name}</td>
      <td>{price}</td>
    </tr>
  );
}

export default ProductRow;
