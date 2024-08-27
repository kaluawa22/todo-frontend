import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';

import TodoModal from './TodoModal';

export default function MyNavBar() {
    const [showModal, setShowModal] = useState(false);
  
    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
    return (
      <MDBNavbar light bgColor='light'>
        <MDBContainer tag="form" fluid className='justify-content-start'>
          <MDBBtn outline color="success" className='me-2' type='button' onClick={toggleModal}>
            NEW TASK
          </MDBBtn>
          <MDBBtn outline color="secondary" size="sm" type='button'>
            NEW TASK
          </MDBBtn>
        </MDBContainer>
  
        {/* Render the TodoModal */}
        <TodoModal showModal={showModal} toggleModal={toggleModal} />
      </MDBNavbar>
    );
  }