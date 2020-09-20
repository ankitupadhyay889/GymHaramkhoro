const express = require('express');
const path = require("path");
const fs = require("fs");

const app = express();

var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/gymfit', {useNewUrlParser: true});

const port = process.env.PORT || 4000


// Schema bna rhe hum 
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    more: String,
});
var GYMFIT = mongoose.model('GYMFIT', contactSchema);


//serving the static file 
app.use('/static' , express.static('static'))
app.use(express.urlencoded())

app.set('view engine' , 'ejs')//set the template engine as html of ejs

app.set('views' , __dirname + '/views')//set the views directory
app.engine('html', require('ejs').renderFile);//render the file


app.get('/gym' , (req,res) => {
    res.status(200).render('gym.html');
})

app.get('/' , (req,res) => {
    res.status(200).render('home.html');
})

app.get('/about' , (req,res) => {
    res.status(200).render('about.html');
})

app.get("/suggestions" , (req,res) => {
    res.status(200).render('suggestion.html');
})

app.post('/suggestions' , (req , res) => {
    name = req.body.name
    email = req.body.email
    phone = req.body.phone
    more = req.body.more
    var ramayan = `The name of client is ${name} and his/her mail id is ${email} or contact number is ${phone} and the message was ${more}.......`
    fs.writeFileSync('motivations.txt' , ramayan)
    res.status(200).render('suggestion.html')
})


app.get('/contact' , (req,res) => {
    res.status(200).render('contact.html');
})


app.post('/contact', (req, res)=>{
    var myGym = new GYMFIT(req.body);
    myGym.save().then(() => {
        res.render('gym.html')
    }).catch(() => {
        res.status(404).send("Item not found")
    });
    // res.status(200).render('contact.pug');
})


app.listen(port , () => {
    console.log(`Server chla ${port} pr`);
})