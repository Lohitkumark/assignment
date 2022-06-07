import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import ClientForm from "./ClientForm";
import { useDispatch, useSelector } from "react-redux";
import { editClient, showClient } from "./clients";

const ClientEdit = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;

  // console.log(id);

  const client = useSelector((state) => state.client.oneData);

  const formSubmit = (values) => {
    dispatch(editClient(values));
  };

  useEffect(() => {
    dispatch(showClient(id));
  }, [id]);

  return (
    <div className="edit">
      <Card className="mt-4">
        <Card.Header style={{ textAlign: "center" }}>
          <h1>EDIT CLIENT</h1>
        </Card.Header>
        <Card.Body>
            <ClientForm {...props} formSubmit={formSubmit} client={client} />
            <Button
              size="sm"
              className="mt-2"
              onClick={() => props.history.push(`/clients/show/${id}`)}
            >
              Cancel
            </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClientEdit;
