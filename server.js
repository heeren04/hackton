const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());  // Allow all domains by default (you can configure CORS for specific domains)

app.use(bodyParser.json());  // Middleware to parse JSON request bodies

// Sample user data (with email, password, role, and other details)
const users = [
  {
    id: 1,
    email: 'abc@mail.com',
    password: 'adminpass',
    firstName: 'Rachel',
    lastName: 'Thomas',
    role: 'Admin',
    phone: '1234987650'
  },
  {
    id: 2,
    email: 'non@mail.com',
    password: 'managerpass',
    firstName: 'Alex',
    lastName: 'Jackson',
    role: 'Manager',
    phone: '7894987650'
  },
  {
    id: 3,
    email: 'mmm@mail.com',
    password: 'staffpass',
    firstName: 'Peter',
    lastName: 'Nelson',
    role: 'Staff',
    phone: '7654987124'
  }
];

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user based on email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // If the user is found, return the role
    res.json({ role: user.role });
  } else {
    // If credentials don't match, return an error
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
