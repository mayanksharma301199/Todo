import React from "react";
import CredentialPart from "./CredentialPart";

const SignUp = (props) => {

  const signinProps = {
    title: "Sign Up",
    imageTitle: "userSignUp",
    backComponentName: "Already have an account? SignIn",
  };

  const changeBackComponent = (backComponentTitle) => {

    props.changeComponent(backComponentTitle);

  }

  return <CredentialPart params={signinProps} changeComponent={changeBackComponent}  />;
};

export default SignUp;