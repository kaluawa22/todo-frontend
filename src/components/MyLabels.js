import React, {useState} from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem,} from 'mdb-react-ui-kit';
import axiosInstance from '../api/axiosInstance'; // Adjust the import path as necessary

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
    
    const handleLabelToggle = (label) => {
      // Check if the label is already selected
      const isSelected = todo.labels?.some((selectedLabel) => selectedLabel.id === label.id);
    
      const updatedLabels = isSelected
        ? todo.labels.filter((selectedLabel) => selectedLabel.id !== label.id) // Remove label
        : [...(todo.labels || []), label]; // Add label
    
      // Update the todo state
      // setTodo((prevTodo) => ({
      //   ...prevTodo,
      //   labels: updatedLabels,
      // }));
    
      // Optionally, update the backend with the new label state
      // axios.patch(`/api/todos/${todo.id}/`, { labels: updatedLabels });
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
          <MDBDropdownMenu autoClose="inside">
            {labelItems.map((label) => (
              <MDBDropdownItem key={label.id}>
                <label className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={todo.labels?.some((selectedLabel) => selectedLabel.id === label.id)}
                    onChange={() => handleLabelToggle(label)}
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