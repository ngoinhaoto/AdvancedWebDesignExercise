import "./App.css";
import React from "react";

import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
function App() {
  const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  ];

  const [searchQuery, setSearchQuery] = React.useState("");

  function handleSearchInputChange(query) {
    setSearchQuery(query);
  }

  return (
    <div className="App">
      <header>
        <h1>Product Management Application</h1>

        <div className="FilterableProductContainer">
          <div id="searchBarContainer">
            <SearchBar onSearchInputChange={handleSearchInputChange} />{" "}
          </div>

          <ProductTable
            products={PRODUCTS}
            searchQuery={searchQuery}
          ></ProductTable>
        </div>
      </header>
    </div>
  );
}

export default App;
