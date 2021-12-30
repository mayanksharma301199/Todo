import React, { useState, useEffect} from "react";
import SignUp from "./Components/CredentialPages/SignUp";
import LogIn from "./Components/CredentialPages/LogIn";
import UserTodo from "./Components/UserTodo/UserTodo";
import axios from 'axios';

function App() {
  const baseUrl = 'http://localhost:8000/todo/';
  const [changedComponent, setChangedComponent] = useState("");
  const [freshTodos, setFreshTodos] = useState([]);
  const fetchUserDashboard = () => {
    const authHeader = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("userToken")
    }

    axios.post((baseUrl + 'dashboard'), {headers:authHeader})
    .then(response => {

      if(response.data.componentName === "LogIn"){
        setChangedComponent("LogIn");
      } else {
        let todosArray = []
        for (let key in response.data.todos) {
          todosArray.push(response.data.todos[key]);
        }
        setFreshTodos(todosArray)
        setChangedComponent("UserTodo");

      }
    })
  }

  useEffect(fetchUserDashboard, [])

  const changeBackComponent = (backComponentTitle) => {
    if (backComponentTitle === 'UserTodo') {
      fetchUserDashboard()
    } else {
      setChangedComponent(backComponentTitle);
    }
  };

  return (
    <div>
      {changedComponent === "LogIn" ? (
        <LogIn changeComponent={changeBackComponent} />
      ) : changedComponent === "SignUp" ? (
        <SignUp changeComponent={changeBackComponent} />
      ) : changedComponent === "UserTodo" ? (
        <UserTodo changeComponent={changeBackComponent} todos={freshTodos} />
      ) : <></>}
    </div>
  );
}

export default App;
