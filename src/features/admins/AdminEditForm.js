import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "react-bootstrap";
import { editAdmin, showAdmin } from "./admin";
import Swal from "sweetalert2";

const AdminEditForm = (props) => {

    const admin = useSelector((state) => state.admin.oneData);

    const dispatch = useDispatch();

    const id = props.match.params.id

//   console.log('id', id, admin);

  useEffect(()=>{
    dispatch(showAdmin(id))
  },[id])

  const errors = useSelector((state) => state.admin.errors);

  
  const onSubmit = (formData, onSubmitProps) => {
    const values = {
      formData,
      onSubmitProps,
      props
    };
    // console.log(formData);
    dispatch(editAdmin(values))
    
  };

  const handleCancel = () =>{
    Swal.fire({
        title: "Are You Sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
            props.history.push(`/admins/show/${id}`)
        }
    })
  }
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    hireDate:Yup.date().required("Required"),
    person: Yup.object({
      email: Yup.string().email("invalid Email").required("Required"),
      role: Yup.object({
        id: Yup.number().required("Required"),
      }),
    }),
    //
  });

  return (
    <div>
        <Formik
            initialValues={admin}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            <Form>  
            <div>
                <b style={{color:'red'}}>{errors}</b>
                <Row className="mt-2">
                    <Col>
                        <label className="mb-2"><b>First Name</b> <b style={{color:'red'}}>*</b></label>
                        <Field
                        className="form-control"
                        type="text"
                        placeholder="FirstName"
                        name="firstName"
                        />
                        <div style={{color:'red'}}>
                            <ErrorMessage name="firstName" />
                        </div>
                    </Col>
                    <Col>
                        <label className="mb-2"><b>Last Name</b> <b style={{color:'red'}}>*</b></label>
                        <Field
                        className="form-control"
                        type="text"
                        placeholder="LastName"
                        name="lastName"
                        />
                        <div style={{color:'red'}}>
                        <ErrorMessage name="lastName" />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="mt-2">
                <Row>
                    <Col>
                        <label className="mb-2"><b>Title</b> </label>
                        <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter Title"
                            name="title"
                        />
                        <div style={{color:'red'}}>
                            <ErrorMessage name="title" />
                        </div>
                    </Col>
                    <Col>
                        <label className="mb-2"><b>Ext</b></label>
                        <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter Extension"
                            name="extension"
                        />
                        <div style={{color:'red'}}>
                            <ErrorMessage name="extension" />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="mt-2">
                <Row>
                    <Col>
                    <label className="mb-2"><b>Phone Number</b></label>
                        <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter Phone Number"
                            name="primaryPhoneNumber"
                        />
                        <div style={{color:'red'}}>
                            <ErrorMessage name="primaryPhoneNumber" />
                        </div>
                    </Col>
                    <Col>
                    <label className="mb-2"><b>Hours</b></label>
                        <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter Hours"
                            name="hours"
                        />
                        <div style={{color:'red'}}>
                            <ErrorMessage name="hours" />
                        </div>
                    </Col>
                    <Col>
                    <label className="mb-2"><b>Hire Date</b> <b style={{color:'red'}}>*</b></label>
                        <Field
                            className="form-control"
                            type="date"
                            placeholder="Enter HireDate"
                            name="hireDate"
                        />
                        <div style={{color:'red'}}>
                            <ErrorMessage name="hireDate" />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="mt-2">
            <label className="mb-2"><b>Email</b> <b style={{color:'red'}}>*</b></label>
                <Field
                className="form-control"
                type="email"
                placeholder="Enter Email"
                name="person.email"
                />
                <div style={{color:'red'}}>
                    <ErrorMessage name="person.email" />
                </div>
            </div>
            <div className="mt-2">
            <label className="mb-2"><b>Role</b> <b style={{color:'red'}}>*</b></label>
                <Field
                className="form-control"
                type="number"
                placeholder="Enter Role Id"
                name="person.role.id"
                />
                <div style={{color:'red'}}>
                    <ErrorMessage name="person.role.id" />
                </div>
                <div className="mt-2">
                    <Row>
                        <Col>
                        <label className="mb-2"><b>Address 1</b></label>
                            <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter Address1"
                            name="address.address1"
                            />
                            <div style={{color:'red'}}>
                                <ErrorMessage name="address.address1" />
                            </div>
                        </Col>
                        <Col>
                        <label className="mb-2"><b>Address 2</b></label>
                            <Field
                                className="form-control"
                                type="text"
                                placeholder="Enter Address2"
                                name="address.address2"
                            />
                            <div style={{color:'red'}}>
                                <ErrorMessage name="address.address2" />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mt-2">
                    <Row>
                        <Col>
                        <label className="mb-2"><b>City</b></label>
                            <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter City"
                            name="address.city"
                            />
                            <div style={{color:'red'}}>
                            <ErrorMessage name="address.city" />
                            </div>
                        </Col>
                        <Col>
                        <label className="mb-2"><b>State</b></label>
                            <Field
                                className="form-control"
                                type="text"
                                placeholder="Enter State"
                                name="address.state"
                            />
                            <div style={{color:'red'}}>
                                <ErrorMessage name="address.state" />
                            </div>
                        </Col>
                        <Col>
                        <label className="mb-2"><b>ZipCode</b></label>
                            <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter Zipcode"
                            name="address.zipCode"
                            />
                            <div style={{color:'red'}}>
                                <ErrorMessage name="address.zipCode" />
                            </div>
                        </Col>
                    </Row>
                </div>
                
                <Button type="submit" size="sm" className="mt-2" style={{float:'right'}}>
                Save
                </Button>
                <Button size="sm" className="mt-2" onClick={handleCancel}>
                Cancel
                </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminEditForm;
