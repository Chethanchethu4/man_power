import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Employee from './components/Employee';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/EmployeeEdit/:id" element={<EmployeeEdit />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
