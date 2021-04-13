import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { login } from "../../redux/auth-reducer";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/formsControls/FormsControls";
import { FORM_ERROR } from "final-form";

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
    if(!props.error)
      return {[FORM_ERROR]: props.error};
  }
  if (props.isAuth) 
    return <Redirect to={"/profile"} />;
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxFinalForm onSubmit={onSubmit}/>
    </div>);
};

const LoginReduxFinalForm = (props) => {
  return (<Form onSubmit={props.onSubmit}
                render={({handleSubmit, submitError, submitFailed, invalid}) => (
                  <form onSubmit={handleSubmit}>
                    {submitFailed && <span>{submitError}</span>}
                  <div>
                      <Field component={Input} name={"email"} validate={required} placeholder={"email"} />
                  </div>
                  <div>
                      <Field component={Input} name={"password"} validate={required} placeholder={"password"} type={"password"} />
                  </div>
                  <div>
                      <Field component={Input} name={"rememberMe"} type={"checkbox"} />{" "}Remember me
                  </div>
                  <div>
                      <button disabled={invalid} type={"submit"}>login</button>
                  </div>
              </form>)
            } />);
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    error: state.auth.error
  };
};

export default connect(mapStateToProps, { login })(Login);
