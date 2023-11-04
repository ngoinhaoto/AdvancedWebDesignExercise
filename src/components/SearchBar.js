export default function SearchBar({ setSearchText }) {
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="searchWrapper">
      <input
        type="text"
        id="textInput"
        placeholder="Find your task"
        onChange={handleInputChange}
      />
      <div className="input-group-append">
        <i className="fas fa-search search-icon" id="searchIcon"></i>
      </div>
    </div>
  );
}
