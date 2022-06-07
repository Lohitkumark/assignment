import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteClient, editClient, showClient } from "./clients";

const ClientShow = (props) => {
  const client = useSelector((state) => state.client.oneData);

  // console.log("ad", client);

  const dispatch = useDispatch();

  const id = props.match.params.id;

  // console.log(id);

  useEffect(() => {
    dispatch(showClient(id));
  }, [id]);

  const handleDelete = (id) => {
    const values = {
      id,
      props,
    };
    // console.log(id);
    dispatch(deleteClient(values));
  };

  return (
    <div className="show">
      <Container fluid>
        <Card className="mt-3">
          <Card.Header style={{ textAlign: "center" }}>
            <h3>CLIENTS</h3>
          </Card.Header>
          <Card.Body>
              <>
                {client ? (
                  <div>
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <p>
                              <b>Account Number</b> - {client.accountNumber}{" "}
                            </p>
                            <p>
                              <b>Created User</b> -{" "}
                              {client.createUser
                                ? client.createUser.lastName
                                : ""}{" "}
                              {client.createUser
                                ? client.createUser.firstName
                                : ""}{" "}
                            </p>
                            <p>
                              <b>DOB</b> - {client.dob}{" "}
                            </p>
                            <p>
                              <b>Primary Phone</b> - {client.primaryPhoneNumber}{" "}
                            </p>
                            <p>
                              <b>Email Notification</b> - {client.emailOptingIn? 'true' : 'false'}{" "}
                            </p>
                            <p>
                              <b>Status</b> - {client.activeFlag? 'true' : 'false'}{" "}
                            </p>
                            <p>
                              <b>Emergency Contact Name</b> -{" "}
                              {client.emergencyContactName}{" "}
                            </p>
                            <p>
                              <b>Insurance Company Name</b> - {" "}
                              {client.insurance? client.insurance.name:""}
                            </p>
                            <p>
                              <b>Insurance Group Number</b> -{" "}
                              {client.insuranceGroupNumber}{" "}
                            </p>
                            <p>
                              <b>Insured's Date Of Birth</b> -{" "}
                              {client.insuredDob}{" "}
                            </p>
                          </Col>
                          <Col>
                            <p>
                              <b>Gender</b> - {client.gender}{" "}
                            </p>
                            <p>
                              <b>Email</b> - {client.email}{" "}
                            </p>

                            <p>
                              <b>Address</b> -{" "}
                              {client.address ? client.address.address1 : ""}{" "}
                              {client.address ? client.address.adress2 : ""}{" "}
                              <br />
                              {client.address ? client.address.city : ""}{" "},
                              {client.address ? client.address.state : ""}{" "}
                              <br/>
                              {client.address ? client.address.zipCode : ""}{" "}
                            </p><br/>
                            <p>
                              <b>Gaurdian</b> - {client.guardian}{" "}
                            </p>
                            <p>
                              <b>Emergency Contact Number</b> -{" "}
                              {client.emergencyContactNumber}{" "}
                            </p>
                            <p>
                              <b>Insured's Relationship</b> -{" "}
                              {client.insuredRelationship}{" "}
                            </p>
                            <p>
                              <b>Insurance Policy Number</b> -{" "}
                              {client.insurancePolicyNumber}{" "}
                            </p>
                            <p>
                              <b>Insured's First Name</b> -{" "}
                              {client.insuredFirstName}{" "}
                            </p>
                            <p>
                              <b>Insured's Last Name</b> -{" "}
                              {client.insuredLastName}{" "}
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                ) : (
                  ""
                )}
              </>
          </Card.Body>
          <Card.Footer>
            <div>
              <Button
                size="sm"
                onClick={() => props.history.push("/clients/list")}
              >
                Back
              </Button>

              <Button
                style={{ float: "right", marginLeft: "8px" }}
                size="sm"
                variant="danger"
                onClick={() => handleDelete(client.id)}
              >
                Delete
              </Button>
              <Button
                style={{ float: "right" }}
                size="sm"
                variant="warning"
                onClick={() => props.history.push(`/clients/edit/${client.id}`)}
              >
                Edit
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default ClientShow;
