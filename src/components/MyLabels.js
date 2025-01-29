import React, {useState} from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem,} from 'mdb-react-ui-kit';
import axios from 'axios';

export default function MyLabels(props) {
   const {} = props;

   const [labelItems, setLabelItems] = useState([])

   const getLabelItems = async() => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/labels/');
        // Update the state with todo items
        setLabelItems(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    }
   



  return (
    <div>

        <MDBDropdown group >
              <MDBDropdownToggle color="dark"  onClick={getLabelItems}>Label</MDBDropdownToggle>
              <MDBDropdownMenu autoClose="inside">
                
                {labelItems.map((label) => (
                    <MDBDropdownItem key={label.id} link>
                        {label.title}
                    </MDBDropdownItem>
                ))}

              </MDBDropdownMenu>
            </MDBDropdown>
    </div>
   
  );
}