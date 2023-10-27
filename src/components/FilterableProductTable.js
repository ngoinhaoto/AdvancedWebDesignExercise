import React from "react";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";

function FilterableProductTable(props) {
  const [filterText, setFilterText] = React.useState("");
  const [inStockOnly, setInStockOnly] = React.useState(false); // default is false because we need to see all stuffs
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={props.products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}
export default FilterableProductTable;
