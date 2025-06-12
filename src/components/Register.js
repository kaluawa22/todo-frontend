import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import response from 'axios';
import axiosInstance from '../api/axiosInstance'; // Adjust the import path as necessary
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

export default function Register() {
    
  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axiosInstance.post('http://127.0.0.1:8000/api/register/', {
        username: formData.username,
        password: formData.password,
        email: formData.email
       
      });
      if (response.status === 201 || response.status === 200) {
        // alert("Registration successful!");
        navigate('/'); // Redirect to login page after successful registration
      }
      }catch (error) {
        if(error.response && (error.response.status === 400 || error.response.status === 500)) {
          alert("Registration failed. Please check your input.");
        }
        console.error('Error during registration:', error);
      }
    };

  return (
    <MDBContainer fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}    
    >

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
              <form onSubmit={handleSubmit} className="w-auto">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput 
                      label='Email' 
                      id='form2' 
                      type='email'
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput 
                      label='Username' 
                      id='form1' 
                      type='text' 
                      className='w-100'
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                  />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg'/>
                    <MDBInput 
                        label='Password' 
                        id='form3' 
                        type='password'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size='lg'/>
                    <MDBInput 
                        label='Repeat your password' 
                        id='form4' 
                        type='password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}   
                    />
                  </div>
                  <div className='d-flex justify-content-center mb-4 gap-4'>
                     <MDBBtn 
                        className='mb-4' 
                        size='lg'>
                            Register
                    </MDBBtn>
                    <MDBBtn 
                      className='mb-4' 
                      size='lg'
                      type='button'
                      onClick={() => navigate('/')}
                      >
                          Login
                    </MDBBtn>
                  </div>
                 
              </form>   
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}
