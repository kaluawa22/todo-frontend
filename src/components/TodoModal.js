import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import axios from 'axios';

export default function TodoModal(props) {
  // const [basicModal, setBasicModal] = useState(false);

  // const toggleOpen = () => setBasicModal(!basicModal);

   // State to manage form inputs
  const [checked, setChecked] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');





  // Handle form submission
  const handleSubmit = async() =>{
    // make sure keys in this object matches the serializers for todo model in backend.
    const newTask = {
      title: taskName,
      description: description,
      completed: checked,
    };
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/todos/', newTask); // Adjust the URL to your endpoint
      console.log('Task created successfully:', response.data);
      // Optionally, you can call a function to update the task list in the parent component
      // props.onTaskCreated(response.data);
    } catch (error) {
      console.error('There was an error creating the task:', error);
    }

    // Close the modal after submission
    props.ToggleOpen();
  };




  return (
    <>
      {/* <MDBBtn onClick={toggleOpen}>LAUNCH DEMO MODAL</MDBBtn> */}
      <MDBModal open={props.BasicModal} onClose={props.ToggleOpen} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create New Task</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={props.ToggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput 
                label="Task Name" 
                id="typeText" 
                type="text"
                value = {taskName} 
                onChange={(e) => setTaskName(e.target.value)}
              />

              <MDBTextArea 
                label="Message" 
                id="textAreaExample" 
                rows="{4}" 
                value = {description}
                onChange = {(e) => setDescription(e.target.value)}
              />

              <MDBCheckbox
                id='controlledCheckbox'
                label='Completed'
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={props.ToggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}