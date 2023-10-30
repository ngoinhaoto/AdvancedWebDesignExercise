import React from "react";
import AccordionItem from "./AccordionItem";

function AccordionContainer({ items, closeOtherItems }) {
  // use an array to capture all items, because the first requirement wants it to act independently
  // openItems is an array that keeps track of opened and closed items

  const [openItems, setOpenItems] = React.useState(
    // we need setOpenItems to set the state of all items(open and close)
    () => {
      return Array(items.length).fill(false); // fill with false --> items are closed at first
    }
  );

  const handleAccordionItemClick = (index) => {
    setOpenItems((prevOpenItems) => {
      // create a new array to avoid handling state directly
      const newOpenItems = [...prevOpenItems];

      // toggle open or close, if the item previously was opened, now its closed and vice versa
      newOpenItems[index] = !prevOpenItems[index];

      // if closeOtherItems is true, which means its requirement 2, we close other items by settign all other item to close
      if (closeOtherItems === true) {
        for (let i = 0; i < newOpenItems.length; i++) {
          if (i !== index) {
            // close other items except index
            newOpenItems[i] = false;
          }
        }
      }

      // when done, we just return the newopenitems

      return newOpenItems;
    });
  };

  return (
    <div className="accordion-container">
      {/* map through items and render AccordionItem components */}

      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openItems[index]}
          onClick={() => handleAccordionItemClick(index)}
        />
      ))}
    </div>
  );
}

export default AccordionContainer;
