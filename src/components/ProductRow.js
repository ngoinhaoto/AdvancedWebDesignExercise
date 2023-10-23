import React from "react";

function ProductRow(props) {
  const { name, price } = props.product; // Extract name and price from props.product

  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}

export default ProductRow;
