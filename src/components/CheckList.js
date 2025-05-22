import React, {useState, useRef, useEffect}  from 'react';
import { MDBListGroup, MDBListGroupItem, MDBCheckbox,  MDBInput, MDBBtn } from 'mdb-react-ui-kit';









export default function Checklist({ checklistItems, markChecklistItemComplete, todoId, addChecklistItem, updateChecklistItem, deleteChecklistItem }) {
    const [checklistToggle, setChecklistToggle ] = useState(false);
    // usestate to handle checklist entry
    const [checked, setChecked] = useState(false);
    const [checklistName, setChecklistName] = useState('')



    const [editingItemId, setEditingItemId] = useState(null);
    const [editedLabel, setEditedLabel] = useState('');

    
    // to handle input 
    const inputRef = useRef(null);


    // Focus on the input when the user starts editing
    useEffect(() => {
        if (editingItemId !== null && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingItemId]);


    const toggleChecklist = () => {
        setChecklistToggle(!checklistToggle);
    };


    const handleLabelEdit = (itemId, currentLabel) => {
        setEditingItemId(itemId);
        setEditedLabel(currentLabel);  // Prepopulate the input with the current item title
    };
    
    const onDoubleClickHandler = (itemId) => {
        console.log("You have Clicked Twice");
        setEditingItemId(itemId);
    };


    return (
    <>
    <MDBBtn onClick={toggleChecklist} className='mx-2' color='dark' type='button'>
          Add Checklist Item
    </MDBBtn>
    
   

    {checklistToggle && 
    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '25px' }}>
        <MDBInput 
            label="enter new checklist item" 
            id="form1" 
            type="text"
            value={checklistName} 
            onChange ={(e) => setChecklistName(e.target.value)}
        /> 
        <MDBBtn 
            className='mx-2' 
            color='dark'
            type='button'
            onClick={
                () => {
                    addChecklistItem(todoId, checklistName, checked);
                    setChecklistName('');
                    setChecklistToggle(false);
                } 
            }
        >
            Add
        </MDBBtn>
    </div>
    }
    

    
    <MDBListGroup style={{ minWidth: '22rem' }} light>
    {checklistItems?.length > 0 ? (
        checklistItems.map((item) => (
            <MDBListGroupItem key={item.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MDBCheckbox
                        checked={item.completed}
                        onChange={() => markChecklistItemComplete(todoId, item.id)}  // Only handle completion status here
                        style={{ marginRight: '8px' }}  // Add margin for spacing
                    />
                    <div
                        onClick={(e) => {
                            e.stopPropagation();  // Stops event bubbling to ensure only the div action happens
                            handleLabelEdit(item.id, item.title);  // Handle label edit
                          }}
                        style={{ flexGrow: 1 }}  // Let the label take up the remaining space
                    >
                        {editingItemId === item.id ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <MDBInput
                                    type="text"
                                    value={editedLabel}
                                    ref={inputRef}  // Set the input reference
                                    onChange={(e) => setEditedLabel(e.target.value)}  // Enable input change
                                    // onBlur={() => setEditingItemId(null)}  // Exit edit mode on blur
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            updateChecklistItem(todoId, item.id, editedLabel)
                                            setEditingItemId(null);
                                        }
                                    }}
                                    style={{ flexGrow: 1 }}  // Make input take available space
                                />
                                {/* Add a Save button next to the input */}
                                <MDBBtn
                                    color="primary"
                                    onClick={(e) => {
                                    e.stopPropagation();  // Prevents parent div's onClick from being triggered
                                    // Handle save action here
                                    console.log("Save clicked");
                                    updateChecklistItem(todoId, item.id, editedLabel);
                                    setEditingItemId(null);
                                    }}
                                    style={{ marginLeft: '8px' }}
                                >
                                    Save
                                </MDBBtn>
                                {/* Delete button */}
                                <MDBBtn
                                    color="primary"
                                    onClick={(e) => {
                                    e.stopPropagation();  // Prevents parent div's onClick from being triggered
                                    console.log("Delete clicked");
                                    deleteChecklistItem(todoId, item.id);
                                    // Handle delete action here
                                    }}
                                    style={{ marginLeft: '8px' }}
                                >
                                    Delete
                                </MDBBtn>
                            </div>
                        ) : (
                            <span>{item.title}</span>
                        )}
                    </div>
                </div>
            </MDBListGroupItem>
        ))
      ) : (
        <p></p>
      )}
    </MDBListGroup>

    {/* <MDBListGroup style={{ minWidth: '22rem' }} light>
      {checklistItems?.length > 0 ? (
        checklistItems.map((item) => (
          <MDBListGroupItem key={item.id} tag='label'>
            <MDBCheckbox 
              label={item.title} 
              checked={item.completed} 
              onChange={() => markChecklistItemComplete(todoId, item.id)}  // Handle checkbox change
              
            />
          </MDBListGroupItem>
        ))
      ) : (
        <p>No checklist items available</p>
      )}
    </MDBListGroup> */}
    </>
    
  );
}