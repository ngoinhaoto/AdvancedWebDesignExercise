import "./App.css";
import React from "react";

import FilterableProductTable from "./components/FilterableProductTable";
function App() {
  const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  ];
  // updating the app.js to using only filterableproducttable to simplify the search method,
  // and its more neat and easier to maintain the app this way
  // ----> the state would be inside the filterableproducttable
  // to find state, it should be best to put them in the common parent, in this case its filterableproducttable
  return <FilterableProductTable products={PRODUCTS} />;
}

export default App;
