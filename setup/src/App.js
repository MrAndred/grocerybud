import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () =>{
  let list = localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"));
  }
  else{
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
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
      setList(list.map((item) => {
        if(item.id === editID){
          return {...item, title:name}
        }
        return item;
      }));
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "Success", "value changed")
    }
    else{
      showAlert(true, "Success", "item added to the list")
      const newItem = {
        id: new Date().getTime().toString(), 
        title: name}
      setList([...list, newItem]);
      setName("")
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  }

  const clearList = () => {
    showAlert(true, "Danger", "empty list");
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, "Danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  }

  const editItem = (id) =>{
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])
  return (
    <section className = "sectionCenter">
      <form className = "groceryForm" onSubmit = {handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert = {showAlert}
          list = {list}
        />}
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
        <List items = {list} removeItem = {removeItem} editItem = {editItem} />  
        <button className = "clearBtn" onClick = {clearList}>clear items</button>
      </div>
      }
    </section>
  );
}

export default App