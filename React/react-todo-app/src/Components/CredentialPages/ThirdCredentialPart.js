import React from "react";
import "./CredentialPart.css";

const ThirdCredentialPart = (props) => {

  const backComponentTitle = props.title === "Sign Up" ? "LogIn" : "SignUp";

  const checkValues = () => {props.checkValues(props.title)};

  return (
    <>
      {props.statusErrorParagraph !== "False" &&
      <div>
        <p className="errorParagraph">{props.valueErrorParagraph}</p>
      </div>}
      <div>
        <button onClick={checkValues}>{props.title}</button>
      </div>
      <div>
        <p onClick={() => props.changeComponent(backComponentTitle)}>{props.backComponentName}</p>
      </div>
    </>
  );
};

export default ThirdCredentialPart;
