import React, {useState} from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
  MDBCardTitle, 
  MDBListGroup,
  MDBListGroupItem,
  MDBCheckbox,
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem,
  MDBBadge 
} from 'mdb-react-ui-kit';
import Checklist from './CheckList';
import MyLabels from './MyLabels';

export default function SelectedTodo(props) {
  const { todo, modalOpen, closeModal, markComplete, markChecklistItemComplete, handleCheckboxChange, addChecklistItem, updateChecklistItem, deleteChecklistItem,editTodoName, deleteTodoItem, editTodoDescription  } = props;

  const cardStyles = {
    marginBottom: '10px',
  };


  const [editedTodoName, setEditedTodoName] = useState('');
  const [editingNameMode, setEditingNameMode] = useState(false);
  const [editingDescMode, setEditingDescMode] = useState(false);
  const [editedTodoDescription, setEditedTodoDescription] = useState('');
  const [editedTodoId, setEditedTodoId] = useState(null);





// const handleTodoNameEdit = (todoId, newTodoName) => {

//   setEditedTodoId(todoId);
//   setEditedTodoName(newTodoName);
// }

const handleTodoNameEdit = ( newTodoName) => {
  setEditedTodoName(newTodoName);
  setEditingNameMode(true);
  
}


// const handleTodoDescEdit = (todoId, newTodoDesc) => {

//   setEditedTodoId(todoId);
//   setEditedTodoDescription(newTodoDesc);
// }

const handleTodoDescEdit = (newTodoDesc) => {

  setEditedTodoDescription(newTodoDesc);
  setEditingDescMode(true);
}

// handle getting out of edit mode when closing modal 
const handleClose = () =>{
  closeModal();
  setEditedTodoName(editedTodoName);
  setEditingNameMode(false);
  setEditedTodoDescription(editedTodoDescription);
  setEditingDescMode(false);

}







  return (
    <MDBModal open={modalOpen} onClose={handleClose} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <div
              onClick={(e) => {
                  e.stopPropagation();
                  handleTodoNameEdit(todo.title);
                }}
              style={{ flexGrow: 1 }}
            >
              {editingNameMode ? (
                <div>
                  <MDBInput 
                    label="Task Name" 
                    id="typeText" 
                    type="text" 
                    value={editedTodoName}
                    onChange={(e) => setEditedTodoName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        editTodoName(todo.id, editedTodoName);
                        setEditingNameMode(false);
                      }
                    }}
                    style={cardStyles}
                  />
                  {todo.labels?.length > 0 ? (
                    <div>
                      {todo.labels.map((label) => (
                        <MDBBadge color="dark" light key={label.id} style={{marginRight: ".5rem"}}>
                          {label.title}
                        </MDBBadge>
                      ))}
                    </div>
                  ) : (
                    <MDBBadge color="dark" light style={{marginRight: ".5rem"}}>No labels</MDBBadge>
                  )}
                  <MDBBadge color='dark' light>Created On {props.changeDateFormat(todo?.created_at || '')}</MDBBadge>
                </div>
              ) : (
                <>
                  <MDBModalTitle>{todo.title}</MDBModalTitle>
                  {todo.labels?.length > 0 ? (
                    <div>
                      {todo.labels.map((label) => (
                        <MDBBadge color="dark" light key={label.id} style={{marginRight: ".5rem"}}>
                          {label.title}
                        </MDBBadge>
                      ))}
                    </div>
                  ) : (
                    <MDBBadge color="dark" light style={{marginRight: ".5rem"}}>No labels</MDBBadge>
                  )}
                  <MDBBadge color='dark' light>Created On {props.changeDateFormat(todo?.created_at || '')}</MDBBadge>
                </>
              )}
            </div>
            <MDBBtn className='btn-close' color='none' onClick={closeModal}></MDBBtn>
          </MDBModalHeader>

          <MDBModalBody>
            <MDBModalTitle>Description</MDBModalTitle>
            <div 
              onClick={(e) => {
                  e.stopPropagation();
                  handleTodoDescEdit(todo.description);
                }}
              style={{ flexGrow: 1 }}
            >
              {editingDescMode ? (
                <MDBTextArea 
                  label="Description" 
                  id="typeText" 
                  rows={5} 
                  value={editedTodoDescription}
                  onChange={(e) => setEditedTodoDescription(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      editTodoDescription(todo.id, editedTodoDescription);
                      setEditingDescMode(false);
                    }
                  }}
                  style={cardStyles}
                />
              ) : (
                todo?.description ? (
                  <p>{todo.description}</p>
                ) : (
                  <MDBTextArea 
                    label="Enter A Description" 
                    id="typeText" 
                    rows={5} 
                    value={editedTodoDescription}
                    onChange={(e) => setEditedTodoDescription(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        editTodoDescription(todo.id, editedTodoDescription);
                        setEditingDescMode(false);
                      }
                    }}
                    style={cardStyles}
                  />
                )
              )}
            </div>

            {/* Flex container for side-by-side layout of Checklist and MyLabels */}
            <div style={{ display: 'flex', gap: '1rem'}}>
              {/* Left side with Checklist */}
              <div style={{ flex: 2, maxWidth: '65%' }}>
                <Checklist 
                  checklistItems={todo?.checklist_items} 
                  markChecklistItemComplete={markChecklistItemComplete}
                  todoId={todo.id}
                  addChecklistItem={addChecklistItem}
                  updateChecklistItem={updateChecklistItem}
                  deleteChecklistItem={deleteChecklistItem}
                />
              </div>

              {/* Right side with MyLabels */}
              <div style={{ flex: 1 }}>
                <MyLabels />
              </div>
            </div>

          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn className='mx-2' color='dark' onClick={() => deleteTodoItem(todo.id)}>
              Delete Task
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>

  );
}
