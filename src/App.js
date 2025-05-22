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
  // const [labelItems, setLabelItems] = useState([]);

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
  
  // useEffect(() => {
  //   const fetchLabels = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/api/labels/');
  //       setLabelItems(response.data);
  //     } catch (error) {
  //       console.error('Error fetching labels:', error);
  //     }
  //   };
  
  //   fetchLabels();
  // }, []);
  


  return (
    <MDBContainer>
        {/* <InputTodo /> */}
        <MyNavBar 
        setTodoItems = {setTodoItems}
        />
        <MyTodo 
          todoItems = {todoItems}
          setTodoItems = {setTodoItems}
          // labelItems = {labelItems}

        />
    </MDBContainer>
  );
}

export default App;
