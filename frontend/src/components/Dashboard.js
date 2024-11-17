import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const userName = localStorage.getItem('loggedUser'); 

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

           
            <div style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Roboto', sans-serif",
            }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px #ccc',
                    color: '#333',
                }}>
                    Welcome to the Dashboard!
                </h1>
            </div>
        </div>
    );
}

export default Dashboard;
