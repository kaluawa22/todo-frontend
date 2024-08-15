import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import TodoModal from './TodoModal';


export default function MyNavBar() {

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