import React from "react";
import "./CredentialPart.css";

const SecondCredentialPart = (props) => {

  const setValue = (event) => {

    props.changeValueSet(event.target.value, event.target.name);

  };

  const topValue = (
    <div>
      <input type="text" name="userName" placeholder="Enter your Name" value={props.name} onChange={setValue}></input>
    </div>
  );

  const bottomValue = (
    <div>
      <input type="password" name="userConfirmPassword" placeholder="Confirm password" value={props.confirmPassword} onChange={setValue}></input>
    </div>
  );

  const middleValue = (
    <>
      <div>
        <input type="email" name="userEmail" placeholder="Enter your email" value={props.email} onChange={setValue}></input>
      </div>
      <div>
        <input type="password" name="userPassword" placeholder="Enter your password" value={props.password} onChange={setValue}></input>
      </div>
    </>
  );

  return <>
    
    {props.title === "Sign Up" ? (<>{topValue} {middleValue} {bottomValue}</>) : middleValue}

  </>;
};

export default SecondCredentialPart;
