import React,{useEffect, useState} from 'react'
import { Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import AdminEditForm from './AdminEditForm'
import { editAdmin } from './admin'

const AdminEdit = (props) => {

  return (
    <div className='edit'>
        <Card className="mt-4">
          <Card.Header style={{textAlign:'center'}}>
            <h1>EDIT ADMIN</h1>
          </Card.Header>
          <Card.Body>
            <AdminEditForm {...props} />
          </Card.Body>
        </Card>
        
    </div>
  )
}

export default AdminEdit