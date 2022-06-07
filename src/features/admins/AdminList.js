import React, { useEffect, useState } from "react";
import { Card, Container, ListGroup, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { filterAdmins, listAdmin } from "./admin";

const AdminList = (props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('')

  const dispatch = useDispatch();
  
  const listAdmins = useSelector((state) => {
    return state.admin.data
  });

  const filter = useSelector((state) => {
    return state.admin.filter
  });

  const hasNext = useSelector((state)=>{
    return state.admin.hasNext
  })

  // console.log(data);

  useEffect(()=>{
    if(hasNext){
      dispatch(listAdmin(pageNumber))
    }
  },[hasNext, pageNumber])
 
  const fetchData = () => {
    if(hasNext){
      setPageNumber(pageNumber+1) 
      listAdmin(pageNumber)
    }
  };

  const handleSearchChange = (e) => {
    const input = e.target.value
    setSearch(input)
    if(input.length>0){
      dispatch(filterAdmins(input))
    }
  }

  return (
    <div className="list">
      <Container fluid>
        <Card className="mt-4">
          <Card.Header style={{ textAlign: "center" }}>
            <h1>LISTING ADMINS</h1>
          </Card.Header>
          <Card.Header>
            <Form>
              <Form.Control type='text' value={search} name='search' placeholder="search By Name" onChange={handleSearchChange}/>
            </Form>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <InfiniteScroll
                dataLength={listAdmins.length} 
                next={fetchData}
                hasMore={hasNext}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>No More Records</b>
                  </p>
                }
              >
                {(search.length>0? filter:listAdmins).map((ele) => {
                  return (
                    <ListGroup.Item key={ele.id}>
                      <Link className="items" to={`/admins/show/${ele.id}`} >
                        {ele.firstName} {ele.lastName}
                      </Link>
                    </ListGroup.Item>
                  );
                })}
              </InfiniteScroll>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminList;
