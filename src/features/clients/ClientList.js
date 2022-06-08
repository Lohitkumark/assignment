import React, { useState, useEffect } from "react";
import { Form, Card, Container, ListGroup, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { filterClients, listClient, resetClients } from "./clients";
import InfiniteScroll from "react-infinite-scroll-component";

const ClientList = (props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('')

  const dispatch = useDispatch();

  const listClients = useSelector((state) => {
    return state.client.data;
  });

  // console.log(listClients);

  const filter = useSelector((state) => {
    return state.client.filter
  });

  const hasNext = useSelector((state)=>{
    return state.client.hasNext
  })

  useEffect(()=>{
    dispatch(resetClients())
  },[])

  useEffect(()=>{
      dispatch(listClient(pageNumber))
  },[ pageNumber])
 
  const fetchData = () => {
    if(hasNext){
      setPageNumber(pageNumber+1) 
      listClient(pageNumber)
    }
  };

  const handleSearchChange = (e) => {
    const input = e.target.value
    setSearch(input)
    if(input.length>0){
      dispatch(filterClients(input))
    }
  }


  return (
    <div className="list">
      <Container fluid>
        <Card className="mt-4">
          <Card.Header style={{ textAlign: "center" }}>
            <h1>LISTING CLIENTS</h1>
          </Card.Header>
          <Card.Header>
            <Form>
              <Form.Control
                type="text"
                value={search}
                name="search"
                placeholder="search By Name"
                onChange={handleSearchChange}
              />
            </Form>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <InfiniteScroll
                dataLength={listClients.length}
                next={fetchData}
                hasMore={hasNext}
                loader={<Spinner animation="border" variant="primary" />}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>No More Records</b>
                  </p>
                }
              >
                {(search.length>0? filter:listClients).map((ele) => {
                  return (
                  <ListGroup.Item key={ele.id}>
                    <Link className="items" to={`/clients/show/${ele.id}`} >
                      {ele.firstName} {ele.lastName}
                    </Link>
                  </ListGroup.Item>
                  )
                })}
              </InfiniteScroll>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ClientList;
