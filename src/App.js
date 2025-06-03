import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import axios from 'axios';
import MyTodo from './components/MyTodo';
import InputTodo from './components/InputTodo';
import MyNavBar from "./components/MyNavBar";
import Login from './components/Login';
import Register from './components/Register';
import { useLocation, Routes, Route } from 'react-router-dom';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  // const [labelItems, setLabelItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/todos/');
        setTodoItems(response.data);
      } catch (error) {
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
      {/* Only show navbar if not on /login */}
     {location.pathname !== '/' && location.pathname !== '/register' && (
        <MyNavBar setTodoItems={setTodoItems} />
      )}
      <Routes>
        <Route path="/" element={
          <Login 
          />
          } 
        />
        <Route path="/register" element={
          <Register 
          />
          } 
        />
        <Route
          path="/todos"
          element={
            <MyTodo
              todoItems={todoItems}
              setTodoItems={setTodoItems}
            />
          }
        />
      </Routes>
    </MDBContainer>
  );
}

export default App;