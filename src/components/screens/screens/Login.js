import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests

function Login() {
  // State to store the form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (email === '' || password === '') {
      setError('Both email and password are required!');
      return;
    }

    try {
      // Send POST request to the backend login route
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.data.role) {
        // Redirect based on role
        if (response.data.role === 'Admin') {
          window.location.href = '/admin';
        } else if (response.data.role === 'Manager') {
          window.location.href = '/manager';
        } else if (response.data.role === 'Staff') {
          window.location.href = '/staff';
        }
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <div style={styles.overlay}></div>
      <div className="login-form" style={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <p style={styles.link}>
          Don't have an account? <a href="/signup" style={styles.linkText}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    backgroundImage: 'url(/telecom-background.jpg)', // Background image reference
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '0 20px',
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to make text more readable
    zIndex: '1',
  },
  loginForm: {
    position: 'relative',
    zIndex: '2',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with transparency
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px', // Max width for responsiveness
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    marginTop: '5px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
  link: {
    textAlign: 'center',
    marginTop: '10px',
  },
  linkText: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default Login;
