import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                userName,
                password,
            });
            if (response.status === 200) {
                localStorage.setItem('loggedUser', userName);
                navigate('/dashboard'); 
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Server error');
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
            justifyContent: 'center',
            alignItems: 'center',
        }}>
       
            <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
            }}>
                MAN POWER
            </h1>

      
            <div style={{
                width: '300px',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
            }}>
                <h2 style={{ marginBottom: '20px' }}>Login</h2>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </div>
        </div>
    );
}

export default Login;
