// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var path     = require('path');
var mysql    = require('mysql');

bodyParser = require('body-parser');


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/instagram-but-in-bad-remastered/browser/')));  //TODO rename to your app-name

// listen (start app with node server.js) ======================================
app.listen(8081, function(){
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


// CRUD for posts __________________________________________________________________________________________
app.get('/posts', (req, res) =>
{
  con.query('SELECT * FROM posts', (err, results) =>
  {
    if(err) throw err;
    res.json(results)
  })
})

app.get('/posts/userId/:id', (req, res) =>
{
  const {id} = req.params;
  console.log("ID: " + id);
  con.query('SELECT * FROM posts where userId = ?', [id], (err, results) =>
  {
    if(err) throw err;
    if (results.length > 0)
    {
      //console.log("Result: " + results);
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

app.post('/posts',  (req,res) =>
{
  const newPost = req.body;
  con.query('INSERT INTO posts SET ?', newPost, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newPost });
  });
});

app.put('/posts/:id', (req, res) => {
  const updatedPost = req.body;
  const { id } = req.params;
  con.query('UPDATE posts SET ? WHERE id = ?', [updatedPost, id], (err) => {
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
  con.query('SELECT * FROM comments WHERE post_id = ?', [id], (err, results) =>
  {
    if(err) throw err;
    if (results.length > 0)
    {
      res.json(results[0]);
    } else
    {
      res.status(404).json({message: 'Comment not found'});
    }
  });
});

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
  const comment = req.body.text;
  const uid = req.body.user_id;
  const pid = req.body.post_id;
  console.log("uid", uid);
  console.log("Comment", JSON.stringify(newComment));
  console.log("pid", pid)
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

app.put('/users/:id', (req, res) => {
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


