import React from "react";

function SearchBar(props) {
  function handleInputChange(event) {
    props.onSearchInputChange(event.target.value);
  }

  return (
    <div className="searchRow">
      <input
        type="text"
        className="searchInput"
        placeholder="Search..."
        onChange={handleInputChange}
      />
      <br />
      <label>
        <input
          type="checkbox"
          className="searchInput"
          placeholder="Search..."
          onChange={props.onStockInputChange}
        />
        Only show products in stock
      </label>
    </div>
  );
}

export default SearchBar;
