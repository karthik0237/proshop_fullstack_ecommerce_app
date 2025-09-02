import React from 'react'
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";

import { getUsersList } from "../redux/slice/usersListSlice";
import { deleteUser } from '../redux/slice/userDeleteSlice'
import Loader from "../components/Loader";
import Message from "../components/Message";

function UsersListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading,users,error } = useSelector(state => state.usersList)
    const { userInfo } = useSelector(state => state.userLogin)
    const { success:successDelete } = useSelector(state => state.userDelete)

    useEffect(() => {
      if(userInfo && userInfo.isAdmin){
        dispatch(getUsersList())
      } else {
        navigate('/')
      }
        
        },[dispatch,userInfo,successDelete])
    
    const deleteHandler = (id) => {
      if(window.confirm('Are you sure to delete this user?')){
        dispatch(deleteUser(id))
      }   
    }
   

  return (
    <div>
      <h3>Users</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
         <Table striped bordered hover responsive className="table-sm w-75">
            <thead className='text-center'>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>

            <tbody className='text-center'>
              {users.map( user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className='text-center'>{user.isAdmin ? (
                    <i className="fas fa-check" style={{color:'green'}}></i>
                  ) : (
                     <i className="fas fa-xmark" style={{color:'red'}}></i>
                  )}
                  </td>
                  <td>
                    
                        <Button className='btn-sm' variant='light'
                        onClick={() => {navigate(`/admin/user/${user._id}/edit`)}}>
                          <i className='fa fa-edit'></i>
                        </Button>
                    
                    <Button className='btn-sm' 
                    variant='light'
                    onClick={() => {deleteHandler(user._id)}}>
                          <i className='fa fa-trash'></i>
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      )}
    </div>
  )
}

export default UsersListScreen
