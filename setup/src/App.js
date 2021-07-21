import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ 
    show: false, 
    msg: "", 
    type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if( !name ){
      showAlert(true, "Danger", "please enter value");
    }
    else if( name && isEditing ){
      //deal with edit
    }
    else{
      //add item
      const newItem = {
        id: new Date().getTime().toString(), 
        title: name}
      setList([...list, newItem]);
      setName("")
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  return (
    <section className = "sectionCenter">
      <form className = "groceryForm" onSubmit = {handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert = {showAlert}/>}
        <h3>grocery bud</h3>
        <div className = "formControl">
          <input 
            type = "text" 
            className = "grocery" 
            placeholder = "e. g. apples" 
            value = {name} 
            onChange = {(e) => setName(e.target.value)
            }/>
          <button type = "submit" className = "submitBtn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 &&
      <div className = "groceryContainer">
        <List items = {list}/>  
        <button className = "clearBtn">clear items</button>
      </div>
      }
    </section>
  );
}

export default App