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
<<<<<<< HEAD
  MDBInput, MDBListGroup, MDBListGroupItem, MDBCheckbox
=======
  MDBInput, 
  MDBListGroup,
  MDBListGroupItem,
  MDBCheckbox
>>>>>>> 34f7630a3785015b3310fd044bdd9df5d9de539e
} from 'mdb-react-ui-kit';

export default function SelectedTodo(props) {
  const { todo, modalOpen, closeModal, markComplete, markChecklistItemComplete } = props;

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

            {/* Checklist Section */}
            <h5>Checklist</h5>
            <MDBListGroup style={{ minWidth: '22rem' }} light>
              {todo?.checklist_items?.length > 0 ? (
                todo.checklist_items.map((item) => (
                  <MDBListGroupItem key={item.id} tag='label'>
                    <MDBCheckbox 
                      label={item.title} 
                      checked={item.completed} 
                      onChange={() => markChecklistItemComplete(todo.id, item.id)}  // Call the function on change
                    />
                  </MDBListGroupItem>
                ))
              ) : (
                <p>No checklist items available</p>
              )}
            </MDBListGroup>


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
