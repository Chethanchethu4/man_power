import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function EmployeeEdit() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const userName = localStorage.getItem('loggedUser');
    const [employee, setEmployee] = useState({
        f_Name: '',
        f_Email: '',
        f_Gender: '',
        f_Mobile: '',
        f_Designation: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Fetch Employee Details
    useEffect(() => {
        console.log('Fetching employee data for ID:', id);
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/employees/${id}`);
                console.log("edit id ", response.data);
                setEmployee(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch employee details.');
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/employees/${id}`, employee);
            setMessage(response.data.message);
            setTimeout(() => navigate('/employees'), 2000);
        } catch (err) {
           
            setError(err.response ? err.response.data.message : 'Failed to update employee.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedUser');
        navigate('/');
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
                        src="https://as2.ftcdn.net/v2/jpg/00/55/54/53/1000_F_55545345_F1Zg50qlE8ESvAwwVIyfoh2kBKjs8gQD.jpg" 
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
                        to="/employeeList"
                        style={{
                            textDecoration: 'none',
                            padding: '10px',
                            borderRadius: '4px',
                            backgroundColor: '#28A745',
                            color: 'white',
                            border: 'none',
                        }}
                    >
                        Employee List
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




            <div style={{ backgroundColor: 'lightblue', minHeight: '100vh', padding: '30px' }}>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Edit Employee</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div style={{ marginBottom: '15px' }}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="f_Name"
                            value={employee.f_Name}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="f_Email"
                            value={employee.f_Email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Gender:</label>
                        <select
                            name="f_Gender"
                            value={employee.f_Gender}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Mobile:</label>
                        <input
                            type="text"
                            name="f_Mobile"
                            value={employee.f_Mobile}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Designation:</label>
                        <input
                            type="text"
                            name="f_Designation"
                            value={employee.f_Designation}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Update Employee
                    </button>
                </form>
            </div>
        </div >
    );
}

export default EmployeeEdit;
