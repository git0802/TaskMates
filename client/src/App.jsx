import React, { useState, useEffect } from 'react';
import './App.css';
import Tasks from './components/Tasks';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getUsers = () => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (open) {
      getUsers();
    }
  }, [open]); 
  //execute function when the value of 'open' changes
  //The array [open] is provided as the second argument,
  //which means that the effect will run whenever the
  //'open' state changes.

  

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId); //update selected userId
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  return (
    <>
      <div className="App">
      <div>
          <Link to="/">Home</Link>
        </div>   
        <div>
          <Link to="/tasks">Tasks</Link>
        </div>  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks selectedUserId={selectedUserId} handleUserSelect={handleUserSelect} users={users}/>} />
          <Route path="/users/:id" element={<UserProfile />} />
          {/* <Route path="*" element={<404 />} />*/}
        </Routes>
      </div>
    </>
  );
}

export default App;



// How to make that every user can put their ounw description and image?
// How to implement BrowserRouter when users clicked?


    
      
