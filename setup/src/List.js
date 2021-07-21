import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items }) => {
  return (
  <div className = "groceryList">
    {items.map(( item ) => {
      const { id, title } = item;
      return <article key = { id } className = "groceryItem">
        <p className = "title">{title}</p>
        <div className = "btnContainer">
          <button type = "button" className = "editBtn">
            <FaEdit />
          </button>
          <button type = "button" className = "deleteBtn">
            <FaTrash />
          </button>
        </div>
      </article>
    })}
  </div>
  );
}

export default List
