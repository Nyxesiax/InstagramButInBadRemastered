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

// application -------------------------------------------------------------
app.get('/', function(req,res)
{
  //res.send("Hello World123");
  res.sendFile('index.html', { root: __dirname}+'/dist/instagram-but-in-bad-remastered/browser' );    //TODO rename to your app-name
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

app.get('/users', function(req,res)
{
  con.connect(function(err)
  {
    if(err)
      throw err;
    con.query("SELECT * FROM users",function(err,results){
      if(err)
        throw err;
      console.log(results);
      res.send(results);
      con.end(function(err)
      {
        if(err)
          throw err;
        console.log("Disconnected");
      });
    })
  })
});

app.get('/user', function(req,res)
{
  const id = req.query.id;
  const sql = 'select * from users where id = ?'
  con.query(sql, id, function(err,result) {
    if(err) {
      console.log("Error user")
      console.log(err);
      return res.send(err)
    } else {
      console.log("Result user")
      console.log(result)
      return res.send(result)
    }
  })
});

app.post('/registerWindow', function(req,res) {
  const user = req.body;
  const sql = "insert into users (email, username, password) values (?, ?, ?)";
  console.log("In RegistryWindow Query")
  con.query(sql, [user.email, user.username, user.password], function(err,result) {
    if(err) {
      console.log(err);
      return res.json("0")
    } else {
      console.log(result)
      return res.json("1")
    }
  });
})

app.post('/loginWindow', function(req,res){
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  const sql = 'select * from users where email = ? and password = ?'

  con.query(sql, [email, password], function(err,result) {
    if(err) {
      return res.json(err)
    }
    if (result.length > 0) {
      console.log('Login successful:', result);
      return res.json(result);
    } else {
      console.log('Invalid credentials');
      return res.json({ error: 'Invalid email or password' });
    }
  })
})


// CRUD for posts __________________________________________________________________________________________
app.get('/posts', (req, res) =>
{
  con.query('SELECT * FORM posts', (err, results) =>
  {
    if(err) throw err;
    res.json(results)
  })
})

app.get('/posts/:id', (req, res) =>
{
  const {id} = req.params;
  con.query('SELECT * FORM posts where id = ?', [id], (err, results) =>
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
  db.query('UPDATE posts SET ? WHERE id = ?', [updatedPost, id], (err) => {
    if (err) throw err;
    res.json({ id, ...updatedPost });
  });
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Post deleted' });
  });
});

// CRUD for Comments __________________________________________________________________________________________
app.get('/comments', (req, res) =>
{
  con.query('SELECT * FORM comments', (err, results) =>
  {
    if(err) throw err;
    res.json(results)
  })
})

app.get('/comments/:id', (req, res) =>
{
  const {id} = req.params;
  con.query('SELECT * FORM comments WHERE id = ?', [id], (err, results) =>
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

app.post('/comments',  (req, res) =>
{
  const newComment = req.body;
  con.query('INSERT INTO comments SET ?', newComment, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newComment });
  });
});

app.put('/comments/:id', (req, res) => {
  const updatedComment = req.body;
  const { id } = req.params;
  db.query('UPDATE comments SET ? WHERE id = ?', [updatedComment, id], (err) => {
    if (err) throw err;
    res.json({ id, ...updatedComment });
  });
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM comments WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Comment deleted' });
  });
});

// CRUD for Users __________________________________________________________________________________________
// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
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
  db.query('SELECT * FROM users WHERE name = ? AND password = ?', [name, password], (err, results) => {
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
    if (err) throw err;
    res.json({ id: result.insertId, ...newUser });
  });
});

app.put('/users/:id', (req, res) => {
  const updatedUser = req.body;
  const { id } = req.params;
  db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], (err) => {
    if (err) throw err;
    res.json({ id, ...updatedUser });
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'User deleted' });
  });

// application -------------------------------------------------------------
app.get('/*', function(req,res)
{
  //res.send("Hello World123");
  res.sendFile(path.join(__dirname, '/dist/instagram-but-in-bad-remastered/browser/index.html'));     //TODO rename to your app-name
});


