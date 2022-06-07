import React from "react";
import { Card, Container } from "react-bootstrap";
import AdminForm from "./AdminForm";

const AdminAdd = (props) => {

  return (
    <div className="add">
        <Card className="mt-4">
          <Card.Header style={{textAlign:'center'}}>
            <h1 >CREATE ADMIN</h1>
          </Card.Header>
          <Card.Body>
            <AdminForm {...props} />
          </Card.Body>
        </Card>
    </div>
  );
};

export default AdminAdd;
