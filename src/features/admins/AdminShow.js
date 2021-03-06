import React,{useEffect} from "react";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteAdmin, editAdmin, showAdmin } from "./admin";
import Swal from "sweetalert2";

const AdminShow = (props) => {

  const admin = useSelector((state) => state.admin.oneData);

  // console.log('ad',admin);

  const dispatch = useDispatch()

  const id = props.match.params.id

  useEffect(()=>{
    dispatch(showAdmin(id))
  },[id])

  const handleDelete=(id)=>{
    Swal.fire({
      title: "Are You Sure?",
      text:"Your data will be deleted",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor :"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText:"Delete"
    }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire("Successfully deleted")
    const values={
      id,
      props
    }
    console.log(id);
    dispatch(deleteAdmin(values))
  }
})
  }
  const handleClick =() => {
    props.history.push("/admins/list")
  }

  return (
    <div className="show">
      <Container fluid>
        <Card className="mt-3">
          <Card.Header style={{textAlign:'center'}}>
            <h3>ADMIN</h3>
          </Card.Header>
          <Card.Body>
              <>
                {admin ? (
                  <div>
                    <ListGroup>
                      <ListGroup.Item>
                        <p>
                          <b>Name</b> - {admin.title} {admin.firstName}{" "}
                          {admin.lastName}
                        </p>
                        <p>
                          <b>Phone</b> - {admin.extension}{" "}
                          {admin.primaryPhoneNumber}{" "}
                        </p>
                        <p>
                          <b>Hours</b> - {admin.hours}{" "}
                        </p>
                        <p>
                          <b>Hire Date</b> - {admin.hireDate}{" "}
                        </p>
                        <p>
                          <b>Email</b> -{" "}
                          {admin.person ? admin.person.email : ""}{" "}
                        </p>
                        <p>
                          <b>Role</b> -{" "}
                          {admin.person ? admin.person.role.name : ""}{" "}
                        </p>
                        <p>
                          <b>Address</b> -{" "}
                          {admin.address ? admin.address.address1 : ""}{" "}
                          {admin.address ? admin.address.adress2 : ""}{" "}
                        </p>
                        <p>
                          <b>City</b> -{" "}
                          {admin.address ? admin.address.city : ""}{" "}
                        </p>
                        <p>
                          <b>State</b> -{" "}
                          {admin.address ? admin.address.state : ""}{" "}
                        </p>
                        <p>
                          <b>ZipCode</b> -{" "}
                          {admin.address ? admin.address.zipCode : ""}{" "}
                        </p>
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
            <Button size='sm' onClick={handleClick}>
              Back
            </Button>
            
                      <Button
                        style={{float:'right', marginLeft:'8px'}}
                        size="sm"
                        variant="danger"
                        onClick={()=>handleDelete(admin.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        style={{float:'right'}}
                        size="sm"
                        variant="warning"
                        onClick={()=>(props.history.push(`/admins/edit/${admin.id}`))}>
                        Edit
                      </Button>
                    </div>
          </Card.Footer>
        </Card>
      </Container>
      
    </div>
  );
};

export default AdminShow;
