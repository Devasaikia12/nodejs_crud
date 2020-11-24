require('./models/db');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const employeeController = require('./controllers/employeeController');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended :true}));
app.use(bodyparser.json());
app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',exphbs({extname : '.hbs',defaultLayout : 'mainLayout',layoutsDir : __dirname + '/views/layouts'}));
app.set('view engine','hbs');
app.listen(3000,()=>{
    console.log('Express start');
});

app.use('/employee',employeeController);