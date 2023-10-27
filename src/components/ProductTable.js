import React from "react";
import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";

function ProductTable(props) {
  const rows = [];
  let lastCategory = null;

  let products = props.products;
  let filterText = props.filterText;
  let inStockOnly = props.inStockOnly;

  products.forEach((product) => {
    // now we work with the search and instock stuffs

    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    // if cant find product, return
    if (product.category !== lastCategory) {
      // if the category is new, create new product category for them
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    // if not then no need for new product category, just put the product row
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default ProductTable;
