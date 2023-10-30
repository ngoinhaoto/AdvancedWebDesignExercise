import React from "react";
import "../index.css";

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className={`accordion-item ${isOpen ? "active" : ""}`}>
      <div className="accordion-header" onClick={onClick}>
        <div className="header-left">{title}</div>
        {isOpen ? (
          <i className="fa-solid fa-chevron-up"></i>
        ) : (
          <i className="fa-solid fa-chevron-down"></i>
        )}
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
}

export default AccordionItem;
