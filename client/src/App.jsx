import React, { useState, useEffect } from 'react';
import './App.css';
import Tasks from './components/Tasks';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
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

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

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
          {/* <Link to="/users/:id">User</Link>   */}
        </div>  
        <div>
          <Link to="/tasks">Tasks</Link>
        </div>  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks selectedUserId={selectedUserId}/>} />
          {/* <Route path="/users/:id" element={<UserProfile />} /> */}
          {/* <Route path="*" element={<404 />} />*/}
        </Routes>
        {/* Pass selected user ID to Tasks */} 
        <form>
          {/* <h2>Users</h2> */}
          <div className="dropdown">
            <button onClick={handleOpen} className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Select user</button>
            {open && (
              <div>
              {users.map((user) => (
                <div key={user.id} onClick={() => handleUserSelect(user.id)}>
                  <button type="button">{user.name}</button>
                </div>
              ))}
            </div>
            )}
          </div>
        </form>
        {selectedUser && <UserProfile user={selectedUser} selectedUserId={selectedUserId} />}
      </div>
    </>
  );
}

export default App;



// How to make that every user can put their ounw description and image?
// How to implement BrowserRouter when users clicked?


    
      
