// route design
// {post}   api/users/register
// {post}   api/users/login
// {get}    api/items/:userID
// {get}    api/item/:itemID
// {post}   api/items/:userID
// {put}    api/items/:itemID
// {delete} api/item/:itemID
// {delete} api/items/:userID
//------------------------------------------------start project-------------------------
const mysql = require('mysql');
const express = require('express');
var sha1 = require('sha1');
var app = express();
date = new Date();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo-app',
    multipleStatements: true
});
//---------------------------------------------------------------------------------------------------------
//database connection
function connection(){
  return new Promise(fn);
   function fn(resolve,reject){
     mysqlConnection.connect((err) => {
         if (err)
             return reject(new erorr ('DB connection failed \n Error : ' + err));
         else{
           return resolve('DB connection succeded.');
         }

     });
  }
}
connection()
.then(function(rows){
  console.log(rows);
})
.catch(function(err){
  console.log(err);
});
//---------------------------------------------------------------------------------------------------------
const port = process.env.PORT || 8086;
app.listen(port , ()=>console.log(`listening on port ${port}`));
//---------------------------------------------------------------------------------------------------------
//register user
function register(){
  return new Promise(fn);
   function fn(resolve,reject){
app.post('/api/users/register', async (req, res) => {
    let doc = req.body;
    var sql = "INSERT INTO Users(userName,password,email,phone,address,date) VALUES ?";
var values =[[doc.userName,sha1(doc.password),doc.email,
doc.phone,doc.address,date]];
  await  mysqlConnection.query(sql, [values], (err, rows, fields) => {
      if (!err)
        return resolve(res.send("inserted users"));
      else
          return reject(("error => "+err));
    })
});
}
}
register()
.then(()=>{
  console.log("inserted users");
})
.catch(function(err){
  console.log(err);
  });
//---------------------------------------------------------------------------------------------------------
//login
function login(){
  return new Promise(fn);
   function fn(resolve,reject){
app.post('/api/users/login', async (req, res) => {
	var userName = req.body.username;
	var password = sha1(req.body.password);
	if (username && password) {
	await	mysqlConnection.query('SELECT * FROM Users WHERE userName = ? AND password = ?', [userName, password], function(error, results, fields) {
      if (results.length > 0)
        return resolve('login succeded.');
			 else
				return reject('Incorrect Username and/or Password!');
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});
}
}
login()
.then(()=>{
  console.log("login succeded");
})
.catch(function(err){
  console.log(err);
});
//---------------------------------------------------------------------------------------------------------
//Get all items
function getitems(){
  return new Promise(fn);
   function fn(resolve,reject){
app.get('/api/items/:userID', async (req, res) => {
   await  mysqlConnection.query('SELECT * FROM items WHERE userID = ?', [req.params.userID], (err, rows, fields) => {
        if (!err)
          return resolve(res.send(rows));
        else
            return reject(new erorr("error => "+err));
    })
});
}
}
getitems()
.then(()=>{
  console.log("getting all items");
})
.catch(function(err){
  console.log(err);
});
//---------------------------------------------------------------------------------------------------------
//Get specific item
function getitem(){
  return new Promise(fn);
   function fn(resolve,reject){
app.get('/api/item/:itemID', async (req, res) => {
   await  mysqlConnection.query('SELECT * FROM items WHERE ID = ?', [req.params.itemID], (err, rows, fields) => {
        if (!err)
          return resolve(res.send(rows));
        else
            return reject(new erorr("error => "+err));
    })
});
}
}
getitem()
.then(()=>{
  console.log("getting item");
})
.catch(function(err){
  console.log(err);
});
//-----------------------------------------------------------------------------------------------------
//add new item
function additem(){
  return new Promise(fn);
   function fn(resolve,reject){
app.post('/api/items/:userID', async (req, res) => {
    let doc = req.body;
    var sql = "INSERT INTO items(userID,Name,Date) VALUES ?";
var values =[[req.params.userID,doc.Name,date]];
  await  mysqlConnection.query(sql, [values], (err, rows, fields) => {
      if (!err)
        return resolve(res.send("inserted item"));
      else
          return reject(("error => "+err));
    })
});
}
}
additem()
.then(()=>{
  console.log("inserted item");
})
.catch(function(err){
  console.log(err);
  });
  //-----------------------------------------------------------------------------------------------
  //Update an item
  function update(){
    return new Promise(fn);
     function fn(resolve,reject){
  app.put('/api/items/:itemID', async (req, res) => {
      let doc = req.body;
      var sql = "UPDATE items SET Name = ?, Date = ? WHERE ID = ?";

    await  mysqlConnection.query(sql, [doc.Name,date,req.params.itemID], (err, rows, fields) => {
        if (!err)
          return resolve(res.send("update item"));
        else
            return reject(err);
      })
  });
  }
  }
  update()
  .then(()=>{
    console.log("update item");
  })
  .catch(function(err){
    console.log(err);
    });
//---------------------------------------------------------------------------------------------------------
  //Delete an doctors
    function deleteitem(){
      return new Promise(fn);
       function fn(resolve,reject){
    app.delete('/api/item/:itemID', async (req, res) => {
      await  mysqlConnection.query('DELETE FROM items WHERE ID = ?', [req.params.itemID], (err, rows, fields) => {
          if(!err)
          return resolve(res.send("deleteing item"));
        else
            return reject(new erorr ("error => "+err));
        })
    });
    }
    }
    deleteitem()
    .then(()=>{
      console.log("deleteing item");
    })
    .catch(function(err){
      console.log(err);
      });
//---------------------------------------------------------------------------------------------------------
//Delete an doctors
  function deleteitems(){
    return new Promise(fn);
     function fn(resolve,reject){
  app.delete('/api/items/:userID', async (req, res) => {
    await  mysqlConnection.query('DELETE FROM items WHERE userID = ?', [req.params.userID], (err, rows, fields) => {
        if(!err)
        return resolve(res.send("deleteing all items"));
      else
          return reject(new erorr ("error => "+err));
      })
  });
  }
  }
  deleteitems()
  .then(()=>{
    console.log("deleteing all items");
  })
  .catch(function(err){
    console.log(err);
    });
