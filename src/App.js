import "./App.css";
import AccordionContainer from "./components/AccordionContainer";

function App() {
  const items = [
    {
      title: "Section 1",
      content: "This is the content of section 1",
    },
    {
      title: "Section 2",
      content: "This is the content of section 2",
    },
    {
      title: "Section 3",
      content: "This is the content of section 3",
    },
  ];
  return (
    <div className="App">
      <h1>Accordion App</h1>
      {/* Requirement 1 Accordion */}
      {/* - Requirement 1:
      + click to accordion item to open it
      + click to accordion item to close it
      + click to an item won't impact to another item */}

      <h2>Accordion Requirement 1</h2>

      <AccordionContainer items={items} closeOtherItems={false} />

      {/* Requirement 2 Accordion */}

      {/* - Requirement 2:
      + click to accordion item to open it
      + click to another accordion item to open it and close other item
      + click to an opening item cause no effect */}

      {/* ----> we need to close other items when click on another accordion item */}
      <h2>Accordion Requirement 2</h2>

      <AccordionContainer
        items={items}
        closeOtherItems={true} // we need to close other items according to the requirement 2
      />
    </div>
  );
}

export default App;
