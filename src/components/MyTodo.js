import React, { useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBContainer 
  } from 'mdb-react-ui-kit';
import axios from 'axios';
import SelectedTodo from "./SelectedTodo";




export default function MyTodo(props) {
    const [basicModal, setBasicModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState("null");

    const cardStyles = {
        marginBottom: '50px',
        marginTop: '25px',
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
const toggleModal = (todo = null) => {
    setSelectedTodo(todo); // Set the selected todo
    setBasicModal(!basicModal); // Toggle modal state
  };

  const closeModal = () =>{
    setBasicModal(!basicModal);
  };  

      return (
        <MDBContainer>
            {props.todoItems.map((todo) => (
            <MDBCard style={cardStyles} key={todo.id} onClick={() => toggleModal(todo)}>
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
            <SelectedTodo
                todo={selectedTodo}
                modalOpen={basicModal}
                toggleModal={() => toggleModal(null)}
                markComplete={markComplete}
                closeModal ={closeModal}
            />

        </MDBContainer>
      );

}