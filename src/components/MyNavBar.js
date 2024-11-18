import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import TodoModal from './TodoModal';


export default function MyNavBar(props) {

  const { setTodoItems } = props;

  const [basicModal, setBasicModal] = useState(false);

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
