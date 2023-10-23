import React from "react";
import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";

function ProductTable(props) {
  const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  ];

  // Filter products by category
  const fruits = PRODUCTS.filter((product) => product.category === "Fruits");
  const vegetables = PRODUCTS.filter(
    (product) => product.category === "Vegetables"
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <ProductCategoryRow category="Fruits" />
        {fruits.map((product, index) => (
          <ProductRow key={index} product={product} />
        ))}{" "}
        <ProductCategoryRow category="Vegetables" />
        {vegetables.map((product, index) => (
          <ProductRow key={index} product={product} />
        ))}{" "}
      </tbody>
    </table>
  );
}

export default ProductTable;
