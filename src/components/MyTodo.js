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
    
    // function to mark todo item as complete
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

    // function to mark check list complete 
    const markChecklistItemComplete = async(todoId, checklistItemId) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}/checklist-items/${checklistItemId}/`, {
                completed: true
            });
    
            if (response.status === 200) {
                // Update the state to reflect the change in the completed status
                props.setTodoItems(prevItems =>
                    prevItems.map(todo =>
                        todo.id === todoId ? {
                            ...todo,
                            checklist_items: todo.checklist_items.map(item =>
                                item.id === checklistItemId ? {...item, completed: true} : item
                            )
                        } : todo
                    )
                );
            } else {
                console.error("Failed to mark checklist item as completed");
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const toggleModal = (todo = null) => {
        setSelectedTodo(todo); // Set the selected todo
        setBasicModal(!basicModal); // Toggle modal state
    };

    const closeModal = () =>{
        setBasicModal(false);
    };  

    // function to convert dates from YYYY-MM-DD to MM-DD
    const changeDateFormat = (myDate) => {
        const parts = myDate.split('-');
        const formmatedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
        return formmatedDate;
    }

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
                    {changeDateFormat(todo.created_at)}
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
                todo={selectedTodo}  // Pass the selected todo
                modalOpen={basicModal}  // Pass modal open state
                toggleModal={toggleModal}  // Pass modal toggle function
                markComplete={markComplete}  // Pass markComplete function
                closeModal={closeModal}  // Pass close modal function
                changeDateFormat = {changeDateFormat} //pass function to change date formate
                markChecklistItemComplete ={markChecklistItemComplete}
            />

        </MDBContainer>
      );

}