import React, { useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBContainer,
    MDBBadge  
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

    



    // Function to set new label

    // const setLabel = async (todoId, newTodoLabel) => {
    //     // optimistically update the state with the new todo label before backend call

    //     try{
    //         props.setTodoItems(prevItems =>
    //             prevItems.map(todo =>
    //                 todo.id === todoId ? {...todo, label: newTodoLabel} : todo
    //             )
    //         );
    //         // update selected todal modal sate 
    //         setSelectedTodo(prevTodo => ({
    //             ...prevTodo,
    //             label: newTodoLabel
    //         }));
    //         // make the api call to update todo label in the backend
    //         const response = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}/labels`)
    //     }catch(error){
    //         console.error('Error:', error);

    //     }

    // };

  

    // function to edit todo description


    const editTodoDescription = async (todoId, newTodoDesc) => {
        try{
            // Optimistically update the state with the new todo desc before the backend call
            props.setTodoItems(prevItems =>
                prevItems.map(todo =>
                  todo.id === todoId ? { ...todo, description: newTodoDesc } : todo
                )
              );
            
             // If you are using a selected todo modal or a specific todo state, update it too
            setSelectedTodo(prevTodo => ({
                ...prevTodo,
                description: newTodoDesc
            }));

             // Make the API call to update the todo name in the backend
            const response = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}/`, {
                description: newTodoDesc
            });
        
            // Handle error by reverting the optimistic update if necessary
            if (response.status !== 200) {
                console.error("Failed to update todo description");
                // Optionally revert changes here if the request fails
            }

        }catch(error){
            console.error('Error:', error);
            // Rollback state in case of error
        }
    };
    
    
    
      // function to edit todo name 


    const editTodoName = async (todoId, newTodoName) => {
        try {
          // Optimistically update the state with the new todo name before the backend call
          props.setTodoItems(prevItems =>
            prevItems.map(todo =>
              todo.id === todoId ? { ...todo, title: newTodoName } : todo
            )
          );
      
          // If you are using a selected todo modal or a specific todo state, update it too
          setSelectedTodo(prevTodo => ({
            ...prevTodo,
            title: newTodoName
          }));
      
          // Make the API call to update the todo name in the backend
          const response = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}/`, {
            title: newTodoName
          });
      
          // Handle error by reverting the optimistic update if necessary
          if (response.status !== 200) {
            console.error("Failed to update todo name");
            // Optionally revert changes here if the request fails
          }
      
        } catch (error) {
          console.error('Error:', error);
          // Rollback state in case of error
        }
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

    // Function to handle deleting Todo items

    const deleteTodoItem = async(todoId) => {
        try{
            // Optimistically update the state by removing the deleted todo
            props.setTodoItems(prevItems =>
                prevItems.filter(todo => todo.id != todoId
                    
                )
            );
            closeModal();

            // Make the API call to delete the todo item in the backend
            const response = await axios.delete(`http://127.0.0.1:8000/api/todos/${todoId}/`);
            // Check the response status to confirm deletion
            if (response.status !== 204) {
                console.error("Failed to delete checklist item");
                // Optionally revert changes here if the request fails
                // Add rollback logic here if needed
              }

        }catch(error){
            console.error('Error:', error);
          // Rollback state in case of error
        }
    };







    // function to handle deleting checklist items


    const deleteChecklistItem = async (todoId, checklistItemId) => {
        try {
          const todo = props.todoItems.find(todo => todo.id === todoId);
        //   const checklistItem = todo?.checklist_items.find(item => item.id === checklistItemId);
      
          // Optimistically update the state before the backend call
          props.setTodoItems(prevItems =>
            prevItems.map(todo => 
              todo.id === todoId ? {
                ...todo,
                checklist_items: todo.checklist_items.filter(item => item.id !== checklistItemId)
              } : todo
            )
          );
      
          // Update selectedTodo to keep the modal in sync with new state
          setSelectedTodo(prevTodo => ({
            ...prevTodo,
            checklist_items: prevTodo.checklist_items.filter(item => item.id !== checklistItemId)
          }));
      
          // Now, make the API call to delete the checklist item
          const response = await axios.delete(`http://127.0.0.1:8000/api/todos/${todoId}/checklist-items/${checklistItemId}/`);
      
          // Handle error by reverting the optimistic update (if necessary)
          if (response.status !== 204) {
            console.error("Failed to delete checklist item");
            // Optionally revert changes here if the request fails
            // Add rollback logic here if needed
          }
      
        } catch (error) {
          console.error('Error:', error);
          // Rollback state in case of error
        }
      };
      




    
    // function to handle checklis item edits 

    const updateChecklistItem = async (todoId, checklistItemId, newChecklistTitle) => {

        try{
            // const todo = props.todoItems.find(todo => todo.id === todoId);
            // const checklistItem = todo?.checklist_items.find(item => item.id === checklistItemId);
            


            // Optimistacally update the state before the backend call

            props.setTodoItems(prevItems =>
                prevItems.map(todo => 
                    todo.id === todoId ? {
                        ...todo,
                        checklist_items: todo.checklist_items.map(item => 
                            item.id === checklistItemId ? {...item, title: newChecklistTitle } : item
                        )

                    } : todo
                )
            );
            // Update selectedTodo to keep the modal in sync with new state
            setSelectedTodo(prevTodo => ({
                ...prevTodo,
                checklist_items: prevTodo.checklist_items.map(item =>
                    item.id === checklistItemId ? { ...item, title: newChecklistTitle } : item
                )
            }));

             // Now, make the API call to update the backend
             const response = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}/checklist-items/${checklistItemId}/`, {
                title: newChecklistTitle
            });
    
            // Handle error by reverting the optimistic update (if necessary)
            if (response.status !== 200) {
                console.error("Failed to toggle checklist item completion status");
                // Optionally revert changes here if the request fails
            }

        }catch (error) {
            console.error('Error:', error);
            // Rollback state in case of error
        }
    };



  
    // function to mark check list item complete
    const markChecklistItemComplete = async (todoId, checklistItemId) => {
        try {
            const todo = props.todoItems.find(todo => todo.id === todoId);
            const checklistItem = todo?.checklist_items.find(item => item.id === checklistItemId);
            const newCompletedStatus = !checklistItem.completed;
    
            // Optimistically update the state before backend call
            props.setTodoItems(prevItems =>
                prevItems.map(todo =>
                    todo.id === todoId ? {
                        ...todo,
                        checklist_items: todo.checklist_items.map(item =>
                            item.id === checklistItemId ? { ...item, completed: newCompletedStatus } : item
                        )
                    } : todo
                )
            );
    
            // Update selectedTodo to keep the modal in sync with new state
            setSelectedTodo(prevTodo => ({
                ...prevTodo,
                checklist_items: prevTodo.checklist_items.map(item =>
                    item.id === checklistItemId ? { ...item, completed: newCompletedStatus } : item
                )
            }));
    
            // Now, make the API call to update the backend
            const response = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}/checklist-items/${checklistItemId}/`, {
                completed: newCompletedStatus
            });
    
            // Handle error by reverting the optimistic update (if necessary)
            if (response.status !== 200) {
                console.error("Failed to toggle checklist item completion status");
                // Optionally revert changes here if the request fails
            }
    
        } catch (error) {
            console.error('Error:', error);
            // Rollback state in case of error
        }
    };


    // function to add check list item 
    const addChecklistItem = async (todoId, checklistName, checked) => {
        try {
            // Find the specific todo from the list
            const todo = props.todoItems.find(todo => todo.id === todoId);
        
            // Create the new checklist item object
            const newCheckListItem = {
                 // Temporary unique ID until the backend returns a real one
                //  id: new Date().getTime(),
                title: checklistName,
                completed: checked,        // Initial completed state
            };
        
            // Optimistically update the state before backend call
            props.setTodoItems(prevItems =>
                prevItems.map(todo =>
                    todo.id === todoId
                        ? {
                            ...todo,
                            checklist_items: [
                                ...todo.checklist_items,  // Spread the existing checklist items
                                newCheckListItem          // Add the new checklist item
                            ]
                        }
                        : todo
                )
            );
    
            // Optimistically update `selectedTodo` to reflect the new checklist item
            setSelectedTodo(prevTodo => ({
                ...prevTodo,
                checklist_items: [
                    ...prevTodo.checklist_items,
                    newCheckListItem  // Add the new checklist item
                ]
            }));
        
            // Now, make the API call to save the new checklist item to the backend
            const response = await axios.post(`http://127.0.0.1:8000/api/todos/${todoId}/checklist-items/`, {
                title: checklistName,
                completed: checked
            });
        
            // If the backend call is successful, update the state again with the real ID
            const savedCheckListItem = response.data;
        
            // Update the state to replace the temporary item with the actual one from the backend
            props.setTodoItems(prevItems =>
                prevItems.map(todo =>
                    todo.id === todoId
                        ? {
                            ...todo,
                            checklist_items: todo.checklist_items.map(item =>
                                item.id === newCheckListItem.id  // Use the existing `newCheckListItem`
                                    ? savedCheckListItem   // Replace the temporary item with the one from the backend
                                    : item
                            )
                        }
                        : todo
                )
            );
            
            // Update the selectedTodo with the actual checklist item from the backend
            setSelectedTodo(prevTodo => ({
                ...prevTodo,
                checklist_items: prevTodo.checklist_items.map(item =>
                    item.id === newCheckListItem.id
                        ? savedCheckListItem   // Replace the temporary item with the one from the backend
                        : item
                )
            }));
    
        } catch (error) {
            console.error('Error:', error);
        
            // Optional: Rollback state in case of error
            // props.setTodoItems(prevItems =>
            //     prevItems.map(todo =>
            //         todo.id === todoId
            //             ? {
            //                 ...todo,
            //                 checklist_items: todo.checklist_items.filter(item => item.id !== newCheckListItem.id)  // Remove the optimistically added item
            //             }
            //             : todo
            //     )
            // );
        }
    };
    
  
    
    



    // const toggleModal = (todo = null) => {
    //     setSelectedTodo(todo); // Set the selected todo
    //     setBasicModal(!basicModal); // Toggle modal state
    // };

    const toggleModal = (todo = null) => {
        // Update selectedTodo to the most recent state of the selected todo item
        const updatedTodo = props.todoItems.find(t => t.id === todo?.id);
        setSelectedTodo(updatedTodo || todo);  // Ensure the latest version is passed to the modal
        setBasicModal(!basicModal);
    };
    

    const closeModal = () =>{
        setBasicModal(false);
    };  

    // function to convert dates from YYYY-MM-DD to MM-DD
    const changeDateFormat = (myDate) => {
        if (!myDate) return '';
        const parts = myDate.split('-');
        const formmatedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
        return formmatedDate;
    }

      return (
        <MDBContainer>
            {/* slice.reverse so that todos can be listed with the newest at the top */}
            {props.todoItems.slice().reverse().map((todo) => (
            <MDBCard style={cardStyles} key={todo.id} onClick={() => toggleModal(todo)}>
            <MDBCardBody>
                <MDBCardTitle>{todo.title}</MDBCardTitle>
                
                {/* Conditional rendering for labels with an else */}
                {todo.labels?.length > 0 ? (
                    <div>
                        {todo.labels.map((label) => (
                            <MDBBadge color="dark" light key={label.id}>
                                {label.title}
                            </MDBBadge>
                        ))}
                    </div>
                ) : (
                    <div>

                    </div>
                 
                )}

                <MDBCardText style={{marginTop: "1rem",}}>
                    {todo.description}
                </MDBCardText>
                {/* <MDBCardText>
                    {"Created on " + changeDateFormat(todo.created_at)}
                </MDBCardText> */}
                <MDBBadge color='dark' light>Created On {changeDateFormat(todo?.created_at || '')}</MDBBadge>
                
                {/* Conditional Rendering - for mark as complete button */}
                {/* {!todo.completed && (
                    <MDBBtn onClick={() => markComplete(todo.id)}>
                        Mark Complete
                    </MDBBtn>
                ) } */}
                


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
                addChecklistItem={addChecklistItem}
                updateChecklistItem={updateChecklistItem}
                deleteChecklistItem={deleteChecklistItem}
                editTodoName={editTodoName }
                deleteTodoItem={deleteTodoItem}
                editTodoDescription={editTodoDescription}
                // labelItems={props.labelItems}
                // handleCheckboxChange={handleCheckboxChange} 
            />

        </MDBContainer>
      );

}