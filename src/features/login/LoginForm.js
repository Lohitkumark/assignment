import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "./user";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = (props) => {
  
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (formData, onSubmitProps) => {
    const values = {
      formData,
      onSubmitProps,
      props
    }
    dispatch(userLogin(values));
    // onSubmitProps.resetForm()
  };


  const validationSchema = Yup.object({
    email: Yup.string().email("invalid Email or Password").required("Required"),
    password: Yup.string()
      .min(4, "Must be minimum 4 characters")
      .required("required"),
  });

  const errors = useSelector(state=>state.login.errors)
      
  useEffect(()=>{
    if(errors){
      alert(errors)
    }
  },[errors])

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <Field
              className="form-control"
              type="email"
              placeholder="Enter Email"
              name="email"
            />
            <div style={{ color: "red" }}>
              <ErrorMessage name="email" />
            </div>
            <br />
            <Field
              className="form-control"
              type="password"
              placeholder="Enter password"
              name="password"
            />
            <div style={{ color: "red" }}>
              <ErrorMessage name="password" />
            </div>
            <br />
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
