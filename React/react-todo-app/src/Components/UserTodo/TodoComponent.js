import React, {useState, useRef} from "react";
import edit from "../../Media/edit.png";
import del from "../../Media/del.png";
import "./UserTodo.css";

const TodoComponent = (props) => {
  const [checkedStatus, setCheckedStatus] = useState(props.todoStatus)
  const todoParagraph = useRef()
 
  const deleteTodo = (event) => {
    props.deleteTodo(props.keyValue)
  }
  const statusTodo = (event) => {
    setCheckedStatus(event.target.checked)
    const status = event.target.checked === true ? 1 : 0
    props.changeStatusTodo(status, props.keyValue)
  }
  const editTodo = (event) => {
    const contentParagraph = todoParagraph.current
    if(contentParagraph.isContentEditable){
      contentParagraph.contentEditable = false
      props.editTodo(contentParagraph.innerText, props.keyValue)
    }
    else{
      contentParagraph.contentEditable = true
      contentParagraph.focus()
    }
  }

  return (
    <div className="basic-todo">
      <input type="checkbox" checked={checkedStatus} onChange={statusTodo} className="todo-checkbox"></input>
      <p className="todo-content" ref={todoParagraph}>{props.todoContent}</p>
      <img src={edit} alt="Not Found" onClick={editTodo} className="img-cls" />
      <img src={del} alt="Not Found" onClick={deleteTodo} className="img-cls" />
    </div>
  );
};

export default TodoComponent;
