const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB',
            {useNewUrlParser: true, 
            useCreateIndex: true, 
            useUnifiedTopology: true, 
            useFindAndModify: false},(err)=>{
    if(!err){console.log('Connect Successfully');}
    else {console.log('Could Not conncet');}
});

require('./employee.model');