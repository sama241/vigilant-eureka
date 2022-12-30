
var express = require('express');
var path = require('path');
const { render } = require('ejs');
const { isBuffer } = require('util');
let alert = require("alert");
const { allowedNodeEnvironmentFlags } = require('process');
const { IncomingMessage } = require('http');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

var express = require('express');
var session = require('express-session');
const { truncate } = require('fs/promises');
var MongoDBSession = require('connect-mongodb-session')(session);






  app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true,
    
   
  }));

 

  function checkSession(req,res,next){
    if(req.session.user) return next();
    else res.redirect('/');
  }

  


app.get('/', function (req, res) {
  if(req.session.user) 
 
  delete req.session.user; 
  res.render('login.ejs');
});
app.get('/annapurna', function (req, res) {
  if(req.session.user) 
  res.render('annapurna.ejs')
  else res.redirect('/');

  
});
app.get('/bali',function (req, res) {
  if(req.session.user)
   res.render('bali.ejs')
  else res.redirect('/');
  
});
app.get('/cities', function (req, res) {

  if(req.session.user)
  res.render('cities.ejs')
  else res.redirect('/');

});
app.get('/hiking', function (req, res) {
  if(req.session.user)
  res.render('hiking.ejs')
  else res.redirect('/');
  
});
app.get('/home', function (req, res) {
  if(req.session.user)
  res.render('home.ejs')
  else res.redirect('/');
 

});
app.get('/inca', function (req, res) {
  if(req.session.user)
  res.render('inca.ejs')
  else res.redirect('/');
  
});
app.get('/islands',function (req, res) {
  if(req.session.user)
  res.render('islands.ejs')
  else res.redirect('/');
  
});
app.get('/paris', function (req, res) {
  if(req.session.user)
  res.render('paris.ejs')
  else res.redirect('/');
  
});
app.get('/registration',function (req, res) {
  if(req.session.user) 
  delete req.session.user;
  res.render('registration.ejs')
});
app.get('/rome',function (req, res) {
  if(req.session.user)
  res.render('rome.ejs')
  else res.redirect('/');
  
});
app.get('/santorini',function (req, res) {
  if(req.session.user)
  res.render('santorini.ejs')
  else res.redirect('/');
  
});
app.get('/search',function (req, res) {
  if(req.session.user)
  res.render('searchresults.ejs')
  else res.redirect('/');
});
app.get('/wanttogo',function (req, res) {
  if(req.session.user)
  res.render('wanttogo',{iwanttogo : req.session.user.wanttogolist});
  else res.redirect('/');
 

});
var x;
var y;
app.post('/', function (req, res) {
 
  x = req.body.username;
  y = req.body.password;

  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err;
    var db = client.db('MyDB');
    var collection = db.collection('FirstCollection');
    collection.find({ username: x} && {password:y} , { $exists: true }).toArray(function (err, items) //find if a value exists
    {
      if (err) throw err;

      console.log(items[0]);
      if (items.length == 0) {

        alert('user not found');
        res.render('login.ejs');
      } 
      else if(x.length==0 || y.length==0){
        alert('please enter all the fields');
      }
      else {
        req.session.user=items[0];
        return res.redirect('/home');
      }
    })
  })
});


var MongoClient = require('mongodb').MongoClient;




app.post('home', function (req, res) {

});
app.post('/register', function (req, res) {
  var z=req.body.username;
  var m=req.body.password;
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err;
  var db = client.db('MyDB');
  var collection = db.collection('FirstCollection');
 if(req.body.username=='') {
  alert("please enter username ");
 }
  else if(req.body.password=='') {
    alert("please enter password");
  }
  else{
    collection.find({ username: z } && {password:m} , { $exists: true }).toArray(function (err, items) //find if a value exists
    {
      if(err) throw err;

      if (items.length == 0) {
        db.collection('FirstCollection').insertOne({ username: z, password: m,wanttogolist:[]});
        alert('Successfully logged in');
        return res.redirect('/');
      }
      else {
        alert('username already existed');
      
      }
    
  
    });

  }
  

});
}); 


var allPlaces = ['annapurna','bali','inca','paris','rome','santorini'];
app.post('/search', function (req, res) {
  var z=req.body.Search;
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err;
  var db = client.db('MyDB');
  var collection = db.collection('FirstCollection');
  var searchresult = [];
  
  for( var j=0; j<allPlaces.length;j++){

    if(allPlaces[j].includes(z.toLowerCase())){
       searchresult.push(allPlaces[j]);
       
    }
  }
  if(searchresult.length==0){
    alert("Can't find what you are looking for");
  }
  
  res.render('searchresults',{place:searchresult});
  
}); 
});
app.post('/hiking', function (req, res) {
}); 
app.post('/islands', function (req, res) {
});
app.post('/inca', function (req, res) {
  addtomywanttogolist(req,res,'inca');
  res.redirect('/inca');
}); 
app.post('/bali', function (req, res) {
  addtomywanttogolist(req,res,'bali');
  res.redirect('/bali');
}); 
app.post('/cities', function (req, res) {
}); 
app.post('/annapurna', function (req, res) {
  addtomywanttogolist(req,res,'annapurna');
  res.redirect('/annapurna');
}); 
app.post('/paris', function (req, res) {
  addtomywanttogolist(req,res,'paris');
  res.redirect('/paris');
});
app.post('/rome', function (req, res) {

  addtomywanttogolist(req,res,'rome');
  res.redirect('/rome');
}); 
app.post('/santorini', function (req, res) {
  addtomywanttogolist(req,res,'santorini');
  res.redirect('/santorini');
});


function addtomywanttogolist(req,res,place){
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err;
  var db = client.db('MyDB');
  var collection = db.collection('FirstCollection');
  if(!req.session.user.wanttogolist.includes(place)){
    req.session.user.wanttogolist.push(place);
    req.session.save();
    collection.updateOne(
      {username: req.session.user.username},
      {$set: {wanttogolist: req.session.user.wanttogolist}}
    );
    collection.findOne({username:req.session.user.username},(err,data)=>{
      req.session.user = data;
      req.session.save();
    });
  
}
else{
alert('place already exists in your wanttogolist');
}
});
}
app.listen(3000);



