import SearchBar from "./SearchBar";

export default function TaskSearchCreate({
  setCreatePopUpVisible,
  setSearchText,
}) {
  const handleNewTaskClick = () => {
    setCreatePopUpVisible(true);
  };

  return (
    <div className="taskSearchCreateWrapper">
      <SearchBar setSearchText={setSearchText} />

      <button id="newTask" className="new-task" onClick={handleNewTaskClick}>
        New task
      </button>
    </div>
  );
}
