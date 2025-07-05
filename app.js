var express = require("express");
var bodyParser = require('body-parser');

var app = express();
app.use('/blog', express.static('blog'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/come' , function(req, res){
res.sendFile(__dirname + '/login.html', {qs: req.query});
});

app.post('/come' , urlencodedParser , function(req, res){
    console.log(req.body);
    res.render( __dirname + '/success.html' ,{data: req.body});
});

app.get('/index' , function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res){
    res.sendFile(__dirname + '/About.html');
});

app.get('/three', function(req, res){
    res.sendFile(__dirname + '/Three.html');
});

app.get('/contact', function(req, res){
    res.sendFile(__dirname + '/Contact.html');
});
app.get('/Gallary' ,function(req, res){
  res.sendFile(__dirname + '/gallary.html');

});
app.get('/causes' ,function(req, res){
     res.sendFile(__dirname + '/Causes.html');
});

app.listen(3000);

