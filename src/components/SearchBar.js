import React from "react";

function SearchBar(props) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  const onFilterTextChange = props.onFilterTextChange;
  const onInStockOnlyChange = props.onInStockOnlyChange;

  return (
    <form>
      <input
        type="text"
        placeholder="Search...."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <br></br>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

export default SearchBar;
