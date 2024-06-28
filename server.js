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
app.use(express.static(path.join(__dirname, '/dist/instagram-but-in-bad-remastered/browser')));  //TODO rename to your app-name

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

app.post('/registerWindow', function(req,res) {
  const user = req.body;
  const sql = "insert into users (email, username, password) values (?, ?, ?)";
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

app.get('/loginWindow', function(req,res){
  const email = req.query.email;
  const password = req.query.password;
  const sql = 'select email, password from users where email = ? and password = ?'
  con.query(sql, [email, password], function(err,result) {
    if(err) {
      console.log("Error")
      console.log(err);
      return res.send(err)
    } else {
      console.log("Result")
      console.log(result)
      return res.send(result)
    }
  })
})
