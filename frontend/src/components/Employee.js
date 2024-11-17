import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Employee() {
    const navigate = useNavigate();
    const userName = localStorage.getItem('loggedUser'); 

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
        image: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/addEmployee', formData);
            setMessage(response.data.message);
            setTimeout(() => navigate('/employeeList'), 2000);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage('Error adding employee.');
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



            {/* Employee Form */}
            <div
                style={{
                    padding: '30px',
                    maxWidth: '600px',
                    margin: '40px auto',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        color: '#333',
                    }}
                >
                    Add Employee
                </h2>
                <form>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop: '5px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop: '5px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Mobile No:</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop: '5px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Designation:</label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop: '5px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop: '5px',
                            }}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Course:</label>
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop: '5px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Image Upload:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop: '5px',
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        Submit
                    </button>
                </form>
                {message && (
                    <p style={{ textAlign: 'center', color: message.includes('Error') ? 'red' : 'green', marginTop: '15px' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Employee;
