// set up ========================
const express = require('express');
const http = require('http');
const mysql = require('mysql');
const socketIo = require('socket.io'); // Import Socket.io
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  })
);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
}); // Create a Socket.io server instance

const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// configuration =================
app.use(express.static(path.join(__dirname, '/dist/instagram-but-in-bad-remastered/browser/')));  //TODO rename to your app-name

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// listen (start app with node server.js) ======================================
server.listen(8081, function(){
  console.log("App listening on port 8081");
  console.log("http://localhost:8081")
});

const con = mysql.createConnection({
  database: "instagram_bad",
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "passwort12.",
  ssl: {
    rejectUnauthorized: false
  }
});

con.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// When a client connects
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Emit events when posts are created, updated, or deleted
function notifyClients(event, data) {
  io.emit(event, data);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// CRUD for posts __________________________________________________________________________________________
app.get('/posts', (req, res) =>
{
  con.query('SELECT * FROM posts ORDER BY date DESC', (err, results) =>
  {
    if(err) throw err;
    res.json(results)
  })
})

// app.get('/posts', (req, res) =>
// {
//   con.query('SELECT users.id, users.username, posts.postId, posts.caption, posts.title, posts.body, posts.image,' +
//     'posts.score, posts.date FROM users, posts WHERE users.id = posts.userId;', (err, results) =>
//   {
//     if(err) throw err;
//     res.json(results)
//   })
// })

app.get('/posts/userId/:id', (req, res) =>
{
  const {id} = req.params;
  con.query('SELECT * FROM posts where userId = ? ORDER BY date DESC', [id], (err, results) =>
  {
    if(err) throw err;
    if (results.length > 0)
    {
      res.json(results);
    } else
    {
      res.status(404).json({message: 'Item not found'});
    }
  });
});


app.get('/posts/:id', (req, res) =>
{
  const {id} = req.params;
  con.query('SELECT * FROM posts where Id = ?', [id], (err, results) =>
  {
    if(err) throw err;
    if (results.length > 0)
    {
       res.json(results[0]);
    } else
    {
      res.status(404).json({message: 'Item not found'});
    }
  });
});

app.post('/posts', upload.single('image'), (req, res) => {
  const { userId, caption, title, body, score } = req.body;
  const image = req.file ? req.file.filename : null;
  const query = `INSERT INTO posts (userId, caption, title, body, image, score) VALUES (?, ?, ?, ?, ?, ?)`;
  con.query(query, [userId, caption, title, body, image, score], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const newPost = {postId: result.insertId, userId, caption, title, body, image, score, date: new Date()};
    notifyClients("newPost", newPost)
    res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
  });
});


app.put('/posts/:id', (req, res) => {
  const updatedPost = req.body;
  const { id } = req.params;
  con.query('UPDATE posts SET score = ? WHERE postId = ?', [updatedPost.score, id], (err) => {
    if (err) throw err;
    res.json({ id, ...updatedPost });
  });
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  con.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Post deleted' });
  });
});

// CRUD for Comments __________________________________________________________________________________________
app.get('/comments', (req, res) =>
{
  con.query('SELECT * FROM comments', (err, results) =>
  {
    if(err) throw err;
    res.json(results)
  })
})

app.get('/comments/:id', (req, res) =>
{
  const {id} = req.params;
  con.query('SELECT users.id, users.username, users.profilePicture, comments.idcomments, comments.text\n' +
    'FROM users, comments\n' +
    'WHERE users.id = comments.user_id AND comments.post_id = ?', [id], (err, results) =>
  {
    if(err) throw err;
    if (results.length > 0)
    {
      console.log("Results ", results);
      res.json(results);
    } else
    {
      res.status(404).json({message: 'Comment not found'});
    }
  });
});

/*
app.get('/comments/:id', (req, res) =>
{
  const {id} = req.params;
  con.query('SELECT * FROM comments WHERE post_id = ?', [id], (err, results) =>
  {
    if(err) throw err;
    if (results.length > 0)
    {
      res.json(results);
    } else
    {
      res.status(404).json({message: 'Comment not found'});
    }
  });
});
 */

app.get('comments/singlecomment/:id', (req, res) =>{
  const {id} = req.params;
  con.query('SELECT * FROM comments WHERE idcomments = ?', [id], (err, results) =>{
    if(err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
        res.status(404).json({message: 'Comment not found'});
      }
  })
});

app.post('/comments',  (req, res) =>
{
  const newComment = req.body;
  con.query('INSERT INTO comments SET ?', newComment, (err, result) => {
    if (err) throw err;
    return res.json({ id: result.insertId, ...newComment });
  });
});

app.put('/comments/:id', (req, res) => {
  const updatedComment = req.body;
  const { id } = req.params;
  con.query('UPDATE comments SET ? WHERE id = ?', [updatedComment, id], (err) => {
    if (err) throw err;
    res.json({ id, ...updatedComment });
  });
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  con.query('DELETE FROM comments WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Comment deleted' });
  });
});

// CRUD for Users __________________________________________________________________________________________
// Get all users
app.get('/users', (req, res) => {
  con.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  con.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// Authenticate user by name and password
app.post('/users/authenticate', (req, res) => {
  const { name, password } = req.body;
  con.query('SELECT * FROM users WHERE email = ? AND password = ?', [name, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

app.put('/users/profilePicture/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  console.log("Id", id)
  const image = req.file ? req.file.filename: null;
  console.log("Data", image)
  con.query('UPDATE users SET profilePicture = ? WHERE id = ?', [image, id], (err, results) => {
    console.log("Result server ", results);
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(401).json({ message: 'Something went wrong' });
    }
  });
});

app.post('/users',  (req, res) =>
{
  const newUser = req.body;
  con.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if(err) {
      if(err.code === "ER_DUP_ENTRY")
      {
        return res.status(409).json({message: 'Username or email already exists' });
      } else {
        return res.status(500).json({message: 'Internal Server Error'});
      }
    } else {
      return res.json({ id: result.insertId, ...newUser })
    }
  });
});

app.put('/users/:id', upload.single('image'), (req, res) => {
  const updatedUser = req.body;
  const { id } = req.params;
  con.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], (err) => {
    if (err) throw err;
    res.json({ id, ...updatedUser });
  });
});

app.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  con.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({message: 'User deleted'});
  });
});

// application -------------------------------------------------------------
app.get('/*', function(req,res)
{
  //res.send("Hello World123");
  res.sendFile(path.join(__dirname, '/dist/instagram-but-in-bad-remastered/browser/index.html'));     //TODO rename to your app-name
});


