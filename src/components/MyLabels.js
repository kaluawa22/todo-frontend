import React, {useState} from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem,} from 'mdb-react-ui-kit';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

export default function MyLabels(props) {
   const {todo} = props;

   const [labelItems, setLabelItems] = useState([])

   const getLabelItems = async() => {
    const accessToken = sessionStorage.getItem('accessToken');
    try {
        const response = await axiosInstance.get('http://127.0.0.1:8000/api/labels/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }     
        );
        // Update the state with todo items
        setLabelItems(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    }
   

      // function to update current Label from list of labels in the backend

    //   const updateTodoLabel = async (todId, labelItems) => {
    //     try{
    //       todo = todo.id
    //     }
    // }    
    
    const handleLabelToggle = async (label) => {
      
      const isSelected = todo.labels?.some((selectedLabel) => selectedLabel.id === label.id);

      // Create the updated labels array for UI update
      const updatedLabels = isSelected
        ? todo.labels.filter((selectedLabel) => selectedLabel.id !== label.id)
        : [...(todo.labels || []), label];

      // Update the parent todo state for immediate UI feedback
      if (props.setTodoItems) {
        props.setTodoItems(prevItems =>
          prevItems.map(t =>
            t.id === todo.id ? { ...t, labels: updatedLabels } : t
          )
        );
      }

      // Call backend only if adding (not removing) a label
      if (!isSelected) {
        try {
          await axiosInstance.post(
            `http://127.0.0.1:8000/api/todos/${todo.id}/labels/${label.id}/associate/`,
            { label_id: label.id },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
              },
            }
          );
        } catch (error) {
          console.error('Error associating label:', error);
          // Optionally, revert UI change or show an error to the user
        }
      }
      // If you want to handle removal, you need a similar custom action for disassociation in your backend.
    };
    

  return (
    <div>

        <MDBDropdown group style={{display: "none"}} >
          <MDBDropdownToggle color="dark"  onClick={getLabelItems}>Labels</MDBDropdownToggle>
            <MDBDropdownMenu autoClose="inside">
              {labelItems && labelItems.length > 0 ? (
                labelItems.map((label) => (
                  <MDBDropdownItem key={label.id}>
                    {label.title}
                  </MDBDropdownItem>
                ))
              ) : (
                <MDBDropdownItem disabled>No labels found</MDBDropdownItem>
              )}
            </MDBDropdownMenu>
          </MDBDropdown>

        <MDBDropdown group style={{ }}>
          <MDBDropdownToggle color="dark" onClick={getLabelItems}>
            {/* {todo.labels?.[0]?.title || 'No Label'} */}
            Labels
          </MDBDropdownToggle>
          <MDBDropdownMenu autoClose={false}>
            {labelItems.map((label) => (
              <MDBDropdownItem key={label.id}>
                <label className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={todo.labels?.some((selectedLabel) => selectedLabel.id === label.id)}
                    onChange={() => handleLabelToggle(label)}
                    onClick={e => e.stopPropagation()}
                    style={{ marginRight: '8px' }}
                  />
                  {label.title}
                </label>
              </MDBDropdownItem>
            ))}
          </MDBDropdownMenu>
        </MDBDropdown>
    </div>
   
  );
}