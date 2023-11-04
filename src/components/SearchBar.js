export default function SearchBar() {
  return (
    <div className="searchWrapper">
      <input type="text" id="textInput" placeholder="Find your task" />
      <div className="input-group-append">
        <i className="fas fa-search search-icon" id="searchIcon"></i>
      </div>
    </div>
  );
}
