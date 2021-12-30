import React from "react";
import "./CredentialPart.css";
import userSignUp from "../../Media/userSignUp.png";
import userLogIn from '../../Media/userLogIn.png';

const FirstCredentialPart = (props) => {

  return (
    <>
        <div>
          <h2>{props.title}</h2>
        </div>
        <div>
          <img src={props.imageTitle === "userSignUp" ? userSignUp : userLogIn} alt="Not Found" />
        </div>
        
    </>
  );
};

export default FirstCredentialPart;
