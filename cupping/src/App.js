import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Routes,
  Route,
} from "react-router-dom";

import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';
// import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
import PrivateRoutes from './components/PrivateRoutes';

function App() {

  const [alert, setAlert] = useState(null);
  const [booksData, setbooksData] = useState([]);
  const showAlert = (data) => {
    setAlert({
      type: data.type,
      msg: data.msg
    })
    setTimeout(() => {
      setAlert(null);
    }, 5000)
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Main booksData={booksData} />} />
        <Route path="/register" element={<Register
          alert={alert}
          showAlert={showAlert}
        />}></Route>
        <Route path='/login' element={<Login
          alert={alert}
          showAlert={showAlert}
        />} />
        <Route element={<PrivateRoutes />}>
         
        </Route>
      </Routes>
    </>
  );
}

export default App;

//Note : in-line styling in React JSx must be sent as object)key-value pair