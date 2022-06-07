import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage, Switch } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "react-bootstrap";
import { createClient } from "./clients";

const ClientForm = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  const errors = useSelector((state) => state.client.errors);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    clientFlag: false,
    emailOptingIn: true,
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    guardian: "",
    emergencyContactNumber: "",
    emergencyContactName: "",
    dob: "",
    note: "",
    billingNote: "",
    insurance: null,
    insurancePolicyNumber: "",
    insuranceGroupNumber: "",
    insuredRelationship: "Self",
    insuredFirstName: "",
    insuredLastName: "",
    insuredDob: "",
    activeFlag: true,
    createUser: "",
    address: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    clinicians: [],
    location: {
      id: 1,
      name: "",
      code: "",
      address: {
        id: 0,
        address1: "",
        address2: "",
        state: "",
        city: "",
        zipCode: "",
      },
      label: "",
      value: 0,
    },
  };

  const onSubmit = (formData, onSubmitProps) => {
    const values = {
      formData,
      onSubmitProps,
      props,
    };
    console.log(formData);
    props.formSubmit(values);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    primaryPhoneNumber: Yup.number().required("Required"),
    dob: Yup.date().required("Required"),
    address: Yup.object({
      address1: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zipCode: Yup.string().max(5, 'No a valid zipcode').required("Required"),
    }),

  });

  return (
    <div>
      <Formik
        initialValues={props.client || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <div>
            <b style={{ color: "red" }}>{errors}</b>
            <Row className="mt-2">
              <Col>
                <label className="form-label mb-2">
                  <b>FirstName</b> <b style={{ color: "red" }}>*</b>
                </label>
                <Field
                  className="form-control"
                  type="text"
                  placeholder="FirstName"
                  name="firstName"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="firstName" />
                </div>
              </Col>
              <Col>
                <label className="mb-2">
                  <b>LastName</b> <b style={{ color: "red" }}>*</b>
                </label>
                <Field
                  className="form-control"
                  type="text"
                  placeholder="LastName"
                  name="lastName"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="lastName" />
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              <div className="mt-2">
                <label>
                  <b>Flag</b>
                </label>
                <div className="form-check form-switch">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    name="clientFlag"
                  />{" "}
                </div>
                <div style={{ color: "red" }}>
                  <ErrorMessage name="clientFlag" />
                </div>
              </div>
            </Col>
            <Col>
              <div className="mt-2">
                <label>
                  <b>Gender</b> <b style={{ color: "red" }}>*</b>{" "}
                </label>
                <br />
                <Row>
                  <Col md={4}>
                    <Field
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="male"
                    />{" "}
                    <label>Male</label>{" "}
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="gender" />
                    </div>
                  </Col>
                  <Col md={8}>
                    <Field
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="female"
                    />{" "}
                    <label>Female</label>{" "}
                    
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className="mt-2">
            <Row>
              <Col>
                <label className="mb-2">
                  <b>Primary Phone</b> <b style={{ color: "red" }}>*</b>
                </label>
                <Field
                  className="form-control"
                  type="text"
                  placeholder="Enter Primary Phone"
                  name="primaryPhoneNumber"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="primaryPhoneNumber" />
                </div>
              </Col>
              <Col>
                <label className="mb-2">
                  <b>Secondary Phone</b>{" "}
                </label>
                <Field
                  className="form-control"
                  type="text"
                  placeholder="Enter Secondary Phone"
                  name="secondaryPhoneNumber"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="secondaryPhoneNumber" />
                </div>
              </Col>
            </Row>
          </div>
          <div className="mt-2">
            <Row>
              <Col md={3}>
                <label className="mb-2">
                  <b>Guardian</b>{" "}
                </label>
                <Field
                  className="form-control"
                  type="text"
                  placeholder="Enter Guardian"
                  name="guardian"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="guardian" />
                </div>
              </Col>
              <Col md={4}>
                <label className="mb-2">
                  <b>Date Of Birth</b> <b style={{ color: "red" }}>*</b>
                </label>
                <Field
                  className="form-control"
                  type="date"
                  placeholder="Enter DOB"
                  name="dob"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="dob" />
                </div>
              </Col>
              <Col md={5}>
                <label className="mb-2">
                  <b>Email</b>
                </label>
                <Field
                  className="form-control"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="email" />
                </div>
                <div>
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      type="checkbox"
                      name="emailOptingIn"
                    />{" "}
                    <label>
                      <b>Opting-In</b>
                    </label>
                  </div>
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="emailOptingIn" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="mt-2">
            <div className="mt-2">
              <Row>
                <Col>
                  <label className="mb-2">
                    <b>Address 1</b> <b style={{ color: "red" }}>*</b>
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter Address1"
                    name="address.address1"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="address.address1" />
                  </div>
                </Col>
                <Col>
                  <label className="mb-2">
                    <b>Address 2</b>{" "}
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter Address2"
                    name="address.address2"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="address.address2" />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="mt-2">
              <Row>
                <Col>
                  <label className="mb-2">
                    <b>City</b> <b style={{ color: "red" }}>*</b>{" "}
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter City"
                    name="address.city"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="address.city" />
                  </div>
                </Col>
                <Col>
                  <label className="mb-2">
                    <b>State</b> <b style={{ color: "red" }}>*</b>{" "}
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter State"
                    name="address.state"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="address.state" />
                  </div>
                </Col>
                <Col>
                  <label className="mb-2">
                    <b>ZipCode</b> <b style={{ color: "red" }}>*</b>
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Enter Zipcode"
                    name="address.zipCode"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="address.zipCode" />
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col>
                  <div className="mt-2">
                    <label className="mb-2">
                      <b>Emergency Contact Name</b>
                    </label>
                    <Field
                      className="form-control"
                      type="text"
                      placeholder="Emergency Contact Name"
                      name="emergencyContactName"
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="emergencyContactName" />
                    </div>
                  </div>
                </Col>
                <Col>
                  <label className="mb-2 mt-2">
                    <b>Emergency Contact Number</b>
                  </label>
                  <Field
                    className="form-control"
                    type="number"
                    placeholder="Emergency Contact Number"
                    name="emergencyContactNumber"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="emergencyContactNumber" />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="mt-2">
              <Row>
                <Col>
                  <label className="mb-2">
                    <b>Insured's First Name</b>
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Insured's First Name"
                    name="insuredFirstName"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="insuredFirstName" />
                  </div>
                </Col>
                <Col>
                  <label className="mb-2">
                    <b>Insured's Last Name</b>
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Insured's Last Name"
                    name="insuredLastName"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="insuredLastName" />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="mt-2">
              <Row>
                <Col>
                  <label className="mb-2">
                    <b>Insurance Policy Number</b>
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Insurance Policy Number"
                    name="insurancePolicyNumber"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="insurancePolicyNumber" />
                  </div>
                  <label className="mt-2">
                    <b>active</b>
                  </label>
                  <div className="form-check form-switch">
                    <Field
                      className="form-check-input"
                      type="checkbox"
                      name="activeFlag"
                    />{" "}
                  </div>
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="activeFlag" />
                  </div>
                </Col>
                <Col>
                  <label className="mb-2">
                    <b>Insurance Group Number</b>
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Insurance Group Number"
                    name="insuranceGroupNumber"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="insuranceGroupNumber" />
                  </div>
                  <label className="mb-2 mt-2">
                    <b>Location</b>
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="location"
                    name="location.name"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="location.name" />
                  </div>
                </Col>
              </Row>
            </div>
            <Button type="submit" size="sm" className="mt-2">
              Create
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ClientForm;
