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
});

// application -------------------------------------------------------------
app.get('/', function(req,res)
{
  //res.send("Hello World123");
  res.sendFile('index.html', { root: __dirname}+'/dist/instagram-but-in-bad-remastered/browser' );    //TODO rename to your app-name
});

app.get('/users', function(req,res)
{

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
