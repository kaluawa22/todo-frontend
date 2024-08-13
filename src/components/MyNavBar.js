import React from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';

export default function MyNavBar() {
  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer tag="form" fluid className='justify-content-start'>
        <MDBBtn outline color="success" className='me-2' type='button'>
          NEW TASK
        </MDBBtn>
        <MDBBtn outline color="secondary" size="sm" type='button'>
          NEW TASK
        </MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
}