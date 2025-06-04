import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer
} from 'mdb-react-ui-kit';
import { use } from 'react';
import axios from 'axios';

export default function Login({setAccessToken}) {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: formData.username,
        password: formData.password
      });
      console.log('Login response:', response);
      if (response.data && response.data.access) {
        // Assuming the response contains a token or some user data
        sessionStorage.setItem('accessToken', response.data.access);
        sessionStorage.setItem('refreshToken', response.data.refresh);
        setAccessToken(response.data.access); // Update the access token in the parent component
        navigate('/todos'); // Redirect to home page after successful login
      } else{
        alert("login failed, please try again!");
      }
    }catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 500)) {
        alert("Invalid username or password!");
      } else {
        console.error('Error logging in:', error);
      }
    }
    
  };






   return (
    <MDBContainer fluid 
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}    
    >
    <form onSubmit={handleSubmit} className="w-50"> 
      <MDBInput 
        className='mb-4' 
        type='username' 
        id='form2Example1' 
        label='Username' 
        name='username'
        value={formData.username}
        onChange={handleChange}
      />
      <MDBInput 
        className='mb-4' 
        type='password' 
        id='form2Example2' 
        label='Password'
        name='password'
        value={formData.password}
        onChange={handleChange} 
      />

      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href='#!'>Forgot password?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type='submit' className='mb-4' block>
        Sign in
      </MDBBtn>

      <div className='text-center'>
        <p>
          Not a member? {' '}
          <a 
          href='#!'
          onClick={e => {
            e.preventDefault();
            navigate('/register');
          }}
          >
            Register
          </a>
        </p>
      </div>
    </form>
    </MDBContainer>
  );
}