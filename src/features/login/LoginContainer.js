import React from "react";
import LoginForm from "./LoginForm";
import { Card, Container } from "react-bootstrap";

const LoginContainer = (props) => {
  // console.log(props);
  return (
    <div>
      <Container className="col-md-4 mt-2">
        <Card>
          <Card.Header style={{textAlign:'center'}}>
            <h1>LOGIN</h1>
          </Card.Header>
          <Card.Body>
            <LoginForm {...props} />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginContainer;
