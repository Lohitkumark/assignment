import React,{useEffect} from 'react'
import LoginContainer from '../login/LoginContainer'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, Route, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './Sidebar'
import AdminList from '../admins/AdminList'
import Home from '../home/Home'
import AdminShow from '../admins/AdminShow'
import AdminEdit from '../admins/AdminEdit'
import AdminAdd from '../admins/AdminAdd'
import ClientShow from '../clients/ClientShow'
import ClientEdit from '../clients/ClientEdit'
import ClientAdd from '../clients/ClientAdd'
import ClientList from '../clients/ClientList'
import PrivateRoute from '../../app/PrivateRoute'


const Navigation = (props) => {

  const {userLoggedIn, handleAuth} = props
  const dispatch = useDispatch()
 
  return (
    <div>
      <Navbar bg='secondary' variant='dark' sticky="top">
        <Container fluid>
          <Navbar.Collapse className="justify-content-end">
            <Nav className='justify-content-end' href='/'>
                {userLoggedIn ? (
                  <>
                    <Nav.Item>
                      <Nav.Link eventkey='1' as={Link} to={'/'}
                      onClick={()=>{
                        localStorage.removeItem('token')
                        props.history.push('/')
                        handleAuth()
                      }}>
                       <Button size='sm'>Logout</Button>
                      </Nav.Link>
                    </Nav.Item>
                  </>
                ):(
                  <>
                  <Nav.Item>
                    <Nav.Link eventkey='2' as={Link} to={"/Login"}>
                      <Button size='sm'>Login</Button>
                    </Nav.Link>
                  </Nav.Item>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {userLoggedIn? <Sidebar/> :""}
        <div className='container'>
          <Route path='/' component={Home} exact/>
          <PrivateRoute path='/admins/create' component={AdminAdd}/>
          <PrivateRoute path='/admins/list' component={AdminList} />
          <PrivateRoute path='/admins/show/:id' component={AdminShow}/>
          <PrivateRoute path='/admins/edit/:id/' component={AdminEdit}/>
          <PrivateRoute path='/clients/create' component={ClientAdd}/>
          <PrivateRoute path='/clients/edit/:id/' component={ClientEdit}/>
          <PrivateRoute path='/clients/list' component={ClientList} />
          <PrivateRoute path='/clients/show/:id' component={ClientShow}/>
        </div>
      <Route path='/Login' 
        render={(props)=>{
          return <LoginContainer {...props} handleAuth={handleAuth} />
        }}  
        />      
    </div>
  )
}

export default withRouter(Navigation)