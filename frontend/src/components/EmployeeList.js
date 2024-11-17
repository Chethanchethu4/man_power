import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const userName = localStorage.getItem('loggedUser');

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employees');
            console.log('Fetched Employees:', response.data);
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setError(err.response ? err.response.data.message : 'Failed to fetch employee data.');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedUser');
        navigate('/');
    };

    const handleDelete = async (id) => {
        try {
          
            const response = await axios.delete(`http://localhost:5000/employees/${id}`);
            console.log("Delete response:", response);
            setMessage(response.data.message);
            setEmployees((prevEmployees) => prevEmployees.filter(employee => employee.f_Id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
            setMessage('Error deleting employee.');
        }
    };
    

    return (
        <div style={{
            backgroundImage: 'url(https://as1.ftcdn.net/v2/jpg/08/32/43/08/1000_F_832430877_asgjoPW1sp8WR9oaomLfCOUDd15SDxO6.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Top Menu */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderBottom: '1px solid #ccc',
                alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                        src="https://as2.ftcdn.net/v2/jpg/00/55/54/53/1000_F_55545345_F1Zg50qlE8ESvAwwVIyfoh2kBKjs8gQD.jpg"  L
                        alt="Logo"
                        style={{
                            width: '40px', 
                            height: '40px',
                        }}
                    />
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>MAN POWER</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            padding: '10px 15px',
                            borderRadius: '5px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        Back
                    </button>

                    <Link
                        to="/employee"
                        style={{
                            textDecoration: 'none',
                            padding: '10px',
                            borderRadius: '4px',
                            backgroundColor: '#28A745',
                            color: 'white',
                            border: 'none',
                        }}
                    >
                        Create Employee
                    </Link>
                    <Link
                        to="/DashBoard"
                        style={{
                            textDecoration: 'none',
                            padding: '10px',
                            borderRadius: '4px',
                            backgroundColor: '#28A745',
                            color: 'white',
                            border: 'none',
                        }}
                    >
                        Home
                    </Link>
                    <span style={{
                        fontWeight: 'bold', fontSize: '16px', padding: '10px 15px',
                        borderRadius: '5px',
                        backgroundColor: 'gray',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px', color: '#333'
                    }}>
                        {userName || 'Guest'}
                    </span>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px',
                            borderRadius: '4px',
                            backgroundColor: '#DC3545',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>


            {/* Employee List */}
            <div style={{ padding: '30px' }}>
                <h2 style={{ textAlign: 'center', color: '#333', fontWeight: 'bold' }}>Employee List</h2>
                {error ? (
                    <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
                ) : (
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            marginTop: '20px',
                            backgroundColor: '#fff',
                            borderRadius: '5px',
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Name</th>
                                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Email</th>
                                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Gender</th>
                                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Mobile</th>
                                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Designation</th>
                                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.f_Id}>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{employee.f_Name}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{employee.f_Email}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{employee.f_Gender}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{employee.f_Mobile}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{employee.f_Designation}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                                        <button
                                            onClick={() => navigate(`/EmployeeEdit/${employee.f_Id}`)}
                                            
                                            style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#007BFF', color: 'white' }}
                                        >
                                            
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(employee.f_Id)}
                                            style={{ padding: '5px 10px', backgroundColor: '#DC3545', color: 'white' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </div>
        </div>

    );
}

export default EmployeeList;
