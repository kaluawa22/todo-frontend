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

export default function SelectedTodo(props) {
  // const [basicModal, setBasicModal] = useState(false);

  // const toggleOpen = () => setBasicModal(!basicModal);
//   const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <MDBBtn onClick={toggleOpen}>LAUNCH DEMO MODAL</MDBBtn> */}
      <MDBModal open={props.modalOpen} onClose={props.closeModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create New Task</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={props.ToggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput label="Task Name" id="typeText" type="text" />
              <MDBTextArea label="Message" id="textAreaExample" rows="{4}" />
              {/* <MDBCheckbox
                id='controlledCheckbox'
                label='Completed'
                checked={checked}
                onChange={() => setChecked(!checked)}
              /> */}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={props.ToggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}