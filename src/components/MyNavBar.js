import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import TodoModal from './TodoModal';


import TodoModal from './TodoModal';

export default function MyNavBar() {
<<<<<<< HEAD
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
=======

  const [basicModal, setBasicModal] = useState(false);

  const ToggleOpen = () => {
    setBasicModal(!basicModal);
  }


  return (
    <>
      <MDBNavbar light bgColor='light'>
      <MDBContainer tag="form" fluid className='justify-content-start'>
      <div className="ms-auto">
        <MDBBtn onClick={ToggleOpen} outline color="success" className='me-2' type='button'>
          NEW TASK
        </MDBBtn>

      </div>
       
        <TodoModal 
          ToggleOpen = {ToggleOpen}
          BasicModal = {basicModal}
        />
      </MDBContainer>
      </MDBNavbar>
    </>
   
  );
}
>>>>>>> ba091c0087d995157897abcbf3e6595f42fa704d
