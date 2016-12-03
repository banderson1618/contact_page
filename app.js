var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//uses dummy values, so I don't make my email password public
var transporter = nodemailer.createTransport(smtpTransport({
   service: 'Gmail',
   auth: {
       user: 'example@gmail.com',
       pass: 'passw0rd'
   }
}));

app.get('/', function(req,res,next){
  return res.render('index');
});

app.get('/index', function(req,res,next){
  res.redirect('/');
});

app.get('/contact', function(req,res,next){
  return res.render('contact', {message: ""});
});

app.get('/about', function(req,res,next){
  return res.render('about');
});

/*
For some reason, my req.body is undefined. I've spent an hour and a half trying
to get it to work, and it just won't. It worked perfectly fine in my last
assignment without problem, and I didn't change anything in any of the lines
that have to do with body-parser, but still, it is broken. The email sends just
fine if you give it a value, but because req.body is undefined, I can't get
it to send to the email entered in to the form.
*/
app.get('/email', function(req,res,next){
  console.log(req.body.email);
  transporter.sendMail({
     from: 'sender@gmail.com',
     to: 'reciever@gmail.com',
     subject: 'Shaedy Drink',
     text: 'Liability form goes here'
  });
  return res.render('contact', {message: "Your E-Mail has been successfully sent!"});
});

app.listen(3000, function(){
    console.log('Application running on localhost on port 3000');
});
