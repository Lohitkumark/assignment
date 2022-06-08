import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import ClientForm from "./ClientForm";
import { useDispatch, useSelector } from "react-redux";
import { editClient, showClient } from "./clients";
import Swal from "sweetalert2";

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

  const handleCancel = () => {
    Swal.fire({
      title: "Are You Sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ok",
    }).then((result) => {
      if (result.isConfirmed) {
        props.history.push(`/clients/show/${id}`);
      }
    });
  };
  return (
    <div className="edit">
      <Card className="mt-4">
        <Card.Header style={{ textAlign: "center" }}>
          <h1>EDIT CLIENT</h1>
        </Card.Header>
        <Card.Body>
          <ClientForm {...props} formSubmit={formSubmit} client={client} />
          <Button size="sm" className="mt-2" onClick={handleCancel}>
            Cancel
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClientEdit;
