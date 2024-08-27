import React from 'react';
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
} from 'mdb-react-ui-kit';

export default function SelectedTodo(props) {
  const { todo, modalOpen, closeModal, markComplete } = props;

  const cardStyles = {
    marginBottom: '10px',
  };

  return (
    <MDBModal open={modalOpen} onClose={closeModal} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Task Details</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={closeModal}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput 
              label="Task Name" 
              id="typeText" 
              type="text" 
              value={todo?.title || ''} // Display the task title
              disabled
              style={cardStyles}
            />
            <MDBTextArea 
              label="Message" 
              id="textAreaExample" 
              rows="{4}" 
              value={todo?.description || ''} // Display the task description
              disabled
              style={cardStyles}
            />
            <MDBInput 
              label="Created At" 
              id="createdAt" 
              type="text" 
              value={props.changeDateFormat(todo?.created_at || '')} // Display the created date
              disabled
              style={cardStyles}
            />
          </MDBModalBody>

          <MDBModalFooter>
            {!todo?.completed && (
              <MDBBtn color='success' onClick={() => markComplete(todo.id)}>
                Mark as Complete
              </MDBBtn>
            )}
            <MDBBtn color='secondary' onClick={closeModal}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
