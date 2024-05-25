const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for handling form submission
app.post('/submit', (req, res) => {
    const { password, confirmPassword } = req.body;

    // Validate password strength
    if (password.length < 8) { res.status(400).send('Password must be at least 8 characters long.'); } else if
        (!/[A-Z]/.test(password)) { res.status(400).send('Password must contain at least one uppercase letter.'); } else
        if (!/[0-9]/.test(password)) { res.status(400).send('Password must contain at least one number.'); } else if
            (password !== confirmPassword) { res.status(400).send('Passwords do not match.'); } else { // Password is valid,proceed with further processing 
            res.send('Form submitted successfully.');
        }
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server app.listen(port,
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});