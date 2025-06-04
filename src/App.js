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
import NotFound from './components/NotFound';
import { useLocation, Routes, Route } from 'react-router-dom';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
  // const [labelItems, setLabelItems] = useState([]);
  const location = useLocation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const accessToken = sessionStorage.getItem('accessToken');
  //       const response = await axios.get('http://127.0.0.1:8000/api/todos/', {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },  
  //       });
  //       setTodoItems(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/todos/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },  
        });
        setTodoItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [accessToken]); // <-- rerun when accessToken changes



  
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
            setAccessToken={setAccessToken} 
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
        <Route path="*" element={
          <NotFound 
          />
          } 
        />
      </Routes>
    </MDBContainer>
  );
}

export default App;