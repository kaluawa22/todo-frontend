import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import TodoModal from './TodoModal';


export default function MyNavBar(props) {

  const { setTodoItems } = props;

  const [basicModal, setBasicModal] = useState(false);

  const navigate = useNavigate();

  const ToggleOpen = () => {
    setBasicModal(true);
  }

  const closeModal = () =>{
    setBasicModal(false);
  }

   // Function to refresh the list or add the new task to state
   const handleTaskCreated = (newTask) => {
    setTodoItems(prevTodos => [...prevTodos, newTask]); // Add new task to the existing list
  };


  const handleSignOut = () => {
    sessionStorage.removeItem('accessToken'); // Clear the access token from session storage    
    sessionStorage.removeItem('refreshToken'); // Clear the refresh token from session storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
      <MDBNavbar light bgColor='light'>
      <MDBContainer tag="form" fluid className='justify-content-start'>
      <div className="ms-auto">
        
        <MDBBtn className='mx-2' color='dark' type='button'>
          New Label
        </MDBBtn>

        <MDBBtn onClick={ToggleOpen} className='mx-2' color='dark' type='button'>
          New Task
        </MDBBtn>

        <MDBBtn 
          className='mx-2' 
          color='dark' 
          type='button'
          onClick={handleSignOut}
        >
          Sign Out
        </MDBBtn>

      </div>
       
        <TodoModal 
          ToggleOpen = {ToggleOpen}
          BasicModal = {basicModal}
          closeModal= {closeModal}
          onTaskCreated={handleTaskCreated}
        />
      </MDBContainer>
      </MDBNavbar>
    </>
   
  );
}
