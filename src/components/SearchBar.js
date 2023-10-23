import React from "react";

function SearchBar() {
  function handleInputChange(event) {
    props.onSearchInputChange(event.target.value);
  }
  return (
    <div className="searchRow">
      <input type="text" className="searchInput" placeholder="Search..." />
      <br />
      <label>
        <input
          type="checkbox"
          className="searchInput"
          placeholder="Search..."
        />
        Only show products in stock
      </label>
    </div>
  );
}

export default SearchBar;
