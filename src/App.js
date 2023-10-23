import "./App.css";

import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
function App() {
  return (
    <div className="App">
      <header>
        <h1>Product Management Application</h1>

        <div className="FilterableProductContainer">
          <div id="searchBarContainer">
            <SearchBar />
          </div>

          <ProductTable></ProductTable>
        </div>
      </header>
    </div>
  );
}

export default App;
