import React from "react";
import { Card, Container } from "react-bootstrap";
import ClientForm from "./ClientForm";
import { useDispatch } from "react-redux";
import { createClient } from "./clients";

const ClientAdd = (props) => {

  const dispatch= useDispatch()

  const formSubmit = (values)=>{
    console.log(values);
    dispatch(createClient(values));
  }


  return (
    <div className="add">
        <Card className="mt-4">
          <Card.Header style={{textAlign:'center'}}>
            <h1>CREATE CLIENT</h1>
          </Card.Header>
          <Card.Body>
            <ClientForm {...props} formSubmit={formSubmit}/>
          </Card.Body>
        </Card>
    </div>
  );
};

export default ClientAdd;
