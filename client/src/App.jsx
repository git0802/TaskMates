import React, { useState, useEffect } from 'react';
import './App.css';
import Tasks from './components/Tasks';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import { Routes, Route, Link, Outlet } from 'react-router-dom';


function App() {
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [user, setUser] = useState({id:"", name:"", lastname:"", description:""});

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
      <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                        <div>
                        <i className="glyphicon glyphicon-home"></i>
                            <Link to="/" className="link-dark">Home</Link>
                        </div>   
                        <div>
                        <i className="glyphicon glyphicon-tasks"></i>
                            <Link to="/tasks" className="link-dark">Tasks</Link>
                        </div> 
                </div>
            </nav>       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks selectedUserId={selectedUserId} handleUserSelect={handleUserSelect} users={users}/>} />
          <Route path="/users/:id" element={<UserProfile selectedUserId={selectedUserId}/>} >
            <Route path="/users/:id/tasks" element={<Tasks selectedUserId={selectedUserId} handleUserSelect={handleUserSelect} users={users} />} />
          </Route>
          {/* <Route path="*" element={<404 />} />*/}
        </Routes>
      </div>
      <Outlet />
    </>
  );
}

export default App;





    
      
