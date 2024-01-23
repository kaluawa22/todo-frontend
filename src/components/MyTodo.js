import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBContainer 
  } from 'mdb-react-ui-kit';
  

export default function MyTodo(props) {
    const cardStyles = {
        marginBottom: '100px',
      };
    return (
        <MDBContainer>
            {props.todoItems.map((todo) => (
            <MDBCard style={cardStyles}>
            <MDBCardBody>
                <MDBCardTitle>{todo.title}</MDBCardTitle>
                <MDBCardText>
                    {todo.description}
                </MDBCardText>
                <MDBCardText>
                    {todo.created_at}
                </MDBCardText>
                <MDBBtn>Mark Complete</MDBBtn>
            </MDBCardBody>
            
            </MDBCard>
            ))}
        </MDBContainer>
      );

}