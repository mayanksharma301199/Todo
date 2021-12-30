import React, { useState } from "react";
import "./UserTodo.css";
import TodoComponent from "./TodoComponent";
import axios from "axios";

const UserTodo = (props) => {
  let tempAuthHeader = {};
  const [todosArray, setTodosArray] = useState(props.todos);
  const authHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };
  const baseUrl = "http://localhost:8000/todo/";
  const keyCaptured = (event) => {
    if (event.charCode === 13 && event.target.value !== "") {
      tempAuthHeader = authHeader;
      tempAuthHeader["Reference"] = "newTodo";
      tempAuthHeader["Value"] = event.target.value;
      axiosRequest(newTodoCallback);
    }
  };

  const newTodoCallback = (response) => {
    const tempTodosArray = [...todosArray, response];
    setTodosArray(tempTodosArray);
  };

  const deleteCallback = (response) => {
    console.log(response)
    const tempTodosArray = [];
    todosArray.forEach(element => {
      if(element.todoId !== response.todoId){
        tempTodosArray.push(element)
      }
    });
    // const tempTodosArray = [...todosArray, response];
    setTodosArray(tempTodosArray);
  };

  const editCallback = (response) => {
    const tempTodosArray = [];
    todosArray.forEach(element => {
      if(element.todoId === response.todoId){
        element.todoContent = response.todoContent
        tempTodosArray.push(element)
      }
      else{
        tempTodosArray.push(element)
      }
    });
    // const tempTodosArray = [...todosArray, response];
    setTodosArray(tempTodosArray);
  };

  const checkCallback = (response) => {
    const tempTodosArray = [];
    todosArray.forEach(element => {
      if(element.todoId === response.todoId){
        element.todoStatus = response.todoStatus
        tempTodosArray.push(element)
      }
      else{
        tempTodosArray.push(element)
      }
    });
    // const tempTodosArray = [...todosArray, response];
    setTodosArray(tempTodosArray);
  };

  const axiosRequest = (callBackFunction) => {
    axios
      .post(baseUrl + "dashboard", { headers: tempAuthHeader })
      .then((response) => {
        callBackFunction(response.data);
      });
  };

  const deleteTodo = (keyValue) => {
      tempAuthHeader = authHeader;
      tempAuthHeader["Reference"] = "deleteTodo";
      tempAuthHeader["Value"] = keyValue;
      axiosRequest(deleteCallback);
  }

  const editTodo = (todoContent, keyValue) => {
      tempAuthHeader = authHeader;
      tempAuthHeader["Reference"] = "editTodo";
      tempAuthHeader["Value"] = keyValue;
      tempAuthHeader["todoContent"] = todoContent;
      axiosRequest(editCallback);
  }

  const changeStatusTodo = (todo_status, keyValue) => {
      tempAuthHeader = authHeader;
      tempAuthHeader["Reference"] = "checkTodo";
      tempAuthHeader["Value"] = keyValue;
      tempAuthHeader["todoStatus"] = todo_status;
      axiosRequest(checkCallback);
  }

  const signOut = () => {
    localStorage.removeItem("userToken")
    props.changeComponent("LogIn")
  }

  return (
    <>
      <div className="nav-div">
        <pre className="float-left">TODO</pre>
        <pre className="float-right" onClick={signOut} >LOGOUT</pre>
      </div>

      <div className="main-content-div">
        <input
          type="text"
          className="input-todo"
          placeholder="Enter todo here..."
          onKeyPress={keyCaptured}
        ></input>
        {/* <button className="todo-button">ADD</button> */}

        <ul>
          {todosArray.map((singleTodo) => {
            let status = false
            if (singleTodo.todoStatus){
              status = true
            }
            return (
              <li key={singleTodo.todoId}>
                <TodoComponent changeStatusTodo={changeStatusTodo} todoStatus = {status} keyValue={singleTodo.todoId} deleteTodo={deleteTodo} editTodo={editTodo} todoContent={singleTodo.todoContent} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default UserTodo;
