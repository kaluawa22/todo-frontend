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
} from 'mdb-react-ui-kit';

export default function TodoModal({ showModal, toggleModal }) {
    return (
      <MDBModal isOpen={showModal} toggle={toggleModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {/* Add your form or content here */}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  }