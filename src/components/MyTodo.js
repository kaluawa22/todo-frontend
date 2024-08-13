import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBContainer 
  } from 'mdb-react-ui-kit';
import axios from 'axios';

export default function MyTodo(props) {
    const cardStyles = {
        marginBottom: '100px',
      };
    
    const markComplete = async(id) =>{
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/todos/${id}/`, {
                completed: true
        });

        if (response.status === 200){
             // Update the state to reflect the change in the completed status
            props.setTodoItems(prevItems =>
                prevItems.map(todo => 
                    todo.id === id ? {...todo, completed:true } : todo
                )
            )
        } else {
            console.error("Failed to mark todo as completed");
        }


    } catch(error) {
        console.error('Error:', error);

    }
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
                    {props.changeDateFormat(todo.created_at)}
                </MDBCardText>
                
                {/* Conditional Rendering - for mark as complete button */}
                {!todo.completed && (
                    <MDBBtn onClick={() => markComplete(todo.id)}>
                        Mark Complete
                    </MDBBtn>
                ) }
                


            </MDBCardBody>
            
            </MDBCard>
            ))}
        </MDBContainer>
      );

}