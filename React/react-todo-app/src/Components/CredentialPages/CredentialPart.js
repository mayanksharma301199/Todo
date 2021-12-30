import React, { useState } from "react";
import "./CredentialPart.css";
import FirstCredentialPart from "./FirstCredentialPart";
import SecondCredentialPart from "./SecondCredentialPart";
import ThirdCredentialPart from "./ThirdCredentialPart";
import axios from 'axios';

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const CredentialPart = (props) => {
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [valueConfirmPassword, setValueConfirmPassword] = useState("");
  const [valueErrorParagraph, setValueErrorParagraph] = useState("");
  const [statusErrorParagraph, setStatusErrorParagraph] = useState("False");
  const nameRegex = /^[a-zA-Z ]{2,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const baseUrl = 'http://localhost:8000/todo/';

  let credential = {};

  const updateInputState = (value, inputName) => {
    if (inputName === "userName") {
      setValueName(value);
    } else if (inputName === "userEmail") {
      setValueEmail(value);
    } else if (inputName === "userPassword") {
      setValuePassword(value);
    } else {
      setValueConfirmPassword(value);
    }
  };

  const changeBackComponent = (backComponentTitle) => {
    props.changeComponent(backComponentTitle);
  };

  const verifyCredentialValues = (currentComponent) => {
    if (currentComponent === "Log In") {
    
      credential = {email: valueEmail, password:valuePassword};
      setStatusErrorParagraph("True")
      axios.post((baseUrl + 'login'), credential)
      .then(response => {
        
        if(response.data === "False"){
          setValueErrorParagraph("Not Valid Credentials")
        }
        else{

          localStorage.setItem("userToken", response.data)
          changeBackComponent("UserTodo")

        }
      
      
      })
    } else {
      if (checkLogIn()) {
        if (checkSignIn()) {
          credential = {name: valueName, email: valueEmail, password:valuePassword};
          setStatusErrorParagraph("True")
          axios.post(baseUrl + 'signup', credential)
          .then(response => setValueErrorParagraph(response.data))
        } else {
          console.log("passed log but not sign");
        }
      } else {
        console.log("passed nothing");
      }
    }
  };

  const checkLogIn = () => {
    if (
      valueEmail !== "" &&
      valuePassword !== "" &&
      emailRegex.test(valueEmail)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkSignIn = () => {
    if (
      valueConfirmPassword === valuePassword &&
      valueName !== "" &&
      valueConfirmPassword !== "" &&
      nameRegex.test(valueName)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="outer-div">
        <FirstCredentialPart
          title={props.params.title}
          imageTitle={props.params.imageTitle}
        />
        <SecondCredentialPart
          name={valueName}
          email={valueEmail}
          password={valuePassword}
          confirmPassword={valueConfirmPassword}
          title={props.params.title}
          changeValueSet={updateInputState}
        />
        <ThirdCredentialPart
          title={props.params.title}
          backComponentName={props.params.backComponentName}
          changeComponent={changeBackComponent}
          checkValues={verifyCredentialValues}
          statusErrorParagraph={statusErrorParagraph}
          valueErrorParagraph={valueErrorParagraph}
        />
      </div>
    </>
  );
};

export default CredentialPart;
