import React from "react";
import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";

function ProductTable(props) {
  const { products, searchQuery } = props;

  // Filter products based on category and search query
  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === searchQuery.toLowerCase() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group products by category
  const productsByCategory = {};
  filteredProducts.forEach((product) => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(productsByCategory).map((category, index) => (
          <React.Fragment key={index}>
            <ProductCategoryRow category={category} />
            {productsByCategory[category].map((product, index) => (
              <ProductRow key={index} product={product} />
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
