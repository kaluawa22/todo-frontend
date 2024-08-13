import React from 'react';
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

export default function InputTodo() {

  return (
    <div>
         <MDBInput label="Example label" id="form1" type="text" />
         <MDBTextArea label="Message" id="textAreaExample" rows="{4}" />
    </div>
   
  );
}