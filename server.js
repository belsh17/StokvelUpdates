
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// add on to what worked before (WWB)
const session = require('express-session'); 
// end of add on of what worked before (EWWB)

const app = express();
const port = 3001;

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
// (WWB)
app.use(bodyParser.json()); //Handle JSON requests 


// Configure session middleware
app.use(session({
  secret: 'your_secret_key',  // Change this to a strong, unique key
  resave: false,
  saveUninitialized: false,
}));
// (EWWB)

// Serve static files from the "HomePage" directory
app.use(express.static(path.join(__dirname, 'HomePage')));

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'Charlie14', // Your MySQL password
  database: 'stokveldata' // Your MySQL database name
});

// Connect to the database
db.connect(err => {
  if (err) throw err;
  console.log('Connected to database.');
});

// Route to serve the HTML form for sign up (before it was only this one)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HomePage', 'signup.html'));
});

// Serve login page now added this one (WWB)
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'HomePage', 'login.html'));
});
// (EWWB)

app.post('/register', (req, res) => {
  const { firstname, lastname, email, mobileNumber, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('An error occurred while registering the user.');
      return;
    }

    const sql = 'INSERT INTO user (firstname, lastname, email, mobileNumber, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstname, lastname, email, mobileNumber, hash], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).send('An error occurred while registering the user.');
        return;
      }
      // res.send('User registered successfully!');
      res.redirect('/successLogin.html');
    });
  });
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Attempting login with:', email); // Debug log

  const sql = 'SELECT userID, password FROM user WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send('An error occurred while logging in.');
      return;
    }

    if (results.length === 0) {
      console.log('No user found with email:', email); // Debug log
      res.status(401).send('Invalid email or password.');
      return;
    }

    const { userID, password: hashedPassword } = results[0];
    console.log('Retrieved hashed password from DB:', hashedPassword); // Debug log

    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).send('An error occurred while logging in.');
        return;
      }

      console.log('Password match result:', isMatch); // Debug log

      if (!isMatch) {
        res.status(401).send('Invalid email or password.');
        return;
      }

      // const token = jwt.sign({ userId: id }, 'your_jwt_secret_key', { expiresIn: '1h' });
      // res.json({ token });
      //WWB
      req.session.userID = userID;
      //redirect to stock page
      // res.redirect('/stock');
      res.redirect('/successLogin.html');
      //end of wwb
    });
  });
});
// (EWWB)

//WWB
app.get('/stock', (req, res) => {
  if (!req.session.userID) {
    // If no userId in session, redirect to login
    res.redirect('/login.html');
    return;
  }

  // Serve the stock page
  res.sendFile(path.join(__dirname, 'HomePage', 'stock.html'));
});
//EWWB
  
  // Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });

  
// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const path = require('path');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// // add on to what worked before (WWB)
// const session = require('express-session'); 
// // end of add on of what worked before (EWWB)

// const app = express();
// const port = 3001;

// // Configure body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// // (WWB)
// app.use(bodyParser.json()); //Handle JSON requests 


// // Configure session middleware
// app.use(session({
//   secret: 'your_secret_key',  // Change this to a strong, unique key
//   resave: false,
//   saveUninitialized: false,
// }));
// // (EWWB)

// // Serve static files from the "HomePage" directory
// app.use(express.static(path.join(__dirname, 'HomePage')));

// // Database connection configuration
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // Your MySQL username
//   password: 'Charlie14', // Your MySQL password
//   database: 'stokveldata' // Your MySQL database name
// });

// // Connect to the database
// db.connect(err => {
//   if (err) throw err;
//   console.log('Connected to database.');
// });

// // Route to serve the HTML form for sign up (before it was only this one)
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'HomePage', 'signup.html'));
// });

// // Serve login page now added this one (WWB)
// app.get('/login.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'HomePage', 'login.html'));
// });
// // (EWWB)

// app.post('/register', (req, res) => {
//   const { firstname, lastname, email, mobileNumber, password } = req.body;

//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) {
//       console.error('Error hashing password:', err);
//       res.status(500).send('An error occurred while registering the user.');
//       return;
//     }

//     const sql = 'INSERT INTO user (firstname, lastname, email, mobileNumber, password) VALUES (?, ?, ?, ?, ?)';
//     db.query(sql, [firstname, lastname, email, mobileNumber, hash], (err, result) => {
//       if (err) {
//         console.error('Database error:', err);
//         res.status(500).send('An error occurred while registering the user.');
//         return;
//       }
//       res.send('User registered successfully!');
//     });
//   });
// });

// // Route to handle login form submission
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   const sql = 'SELECT userID, password FROM user WHERE email = ?';
//   db.query(sql, [email], (err, results) => {
//     if (err) {
//       console.error('Database error:', err);
//       res.status(500).send('An error occurred while logging in.');
//       return;
//     }

//     if (results.length === 0) {
//       res.status(401).send('Invalid email or password.');
//       return;
//     }

//     const { userID, password: hashedPassword } = results[0];

//     bcrypt.compare(password, hashedPassword, (err, isMatch) => {
//       if (err) {
//         console.error('Error comparing passwords:', err);
//         res.status(500).send('An error occurred while logging in.');
//         return;
//       }

//       if (!isMatch) {
//         res.status(401).send('Invalid email or password.');
//         return;
//       }

//       // const token = jwt.sign({ userId: id }, 'your_jwt_secret_key', { expiresIn: '1h' });
//       // res.json({ token });
//       //WWB
//       req.session.userID = userID;
//       //redirect to stock page
//       res.redirect('/stock');
//       //end of wwb
//     });
//   });
// });
// // (EWWB)

// //WWB
// app.get('/stock', (req, res) => {
//   if (!req.session.userID) {
//     // If no userId in session, redirect to login
//     res.redirect('/login.html');
//     return;
//   }

//   // Serve the stock page
//   res.sendFile(path.join(__dirname, 'HomePage', 'stock.html'));
// });
// //EWWB
  
//   // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
//   });