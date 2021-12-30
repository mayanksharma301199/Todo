import React from "react";
import CredentialPart from "./CredentialPart";

const LogIn = (props) => {
  const loginProps = {
    title: "Log In",
    imageTitle: "userLogIn",
    backComponentName: "Create account",
  };

  const changeBackComponent = (backComponentTitle) => {

    props.changeComponent(backComponentTitle);

  }

  return <CredentialPart params={loginProps} changeComponent={changeBackComponent} />;
};

export default LogIn;
