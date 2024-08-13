import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import axios from 'axios';
import MyTodo from './components/MyTodo';
import InputTodo from './components/InputTodo';
import MyNavBar from "./components/MyNavBar";



function App() {
  
  
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/todos/');
        // Update the state with todo items
        setTodoItems(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  // function to convert dates from YYYY-MM-DD to MM-DD
  const changeDateFormat = (myDate) => {
    const parts = myDate.split('-');
    const formmatedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
    return formmatedDate;
  }


  return (
    <MDBContainer>
        {/* <InputTodo /> */}
        <MyNavBar />
        <MyTodo 
          todoItems = {todoItems}
          setTodoItems = {setTodoItems}
          changeDateFormat = {changeDateFormat}
        />
    </MDBContainer>
  );
}

export default App;
