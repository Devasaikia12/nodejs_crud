const express = require('express');
const mongoose  = require('mongoose');
const routes = express.Router();
const Employee = mongoose.model('Employee');
routes.get('/',(req,res)=>{
    res.render('employees/addEditEmployee',{title :'Insert Employee'});
})
routes.post('/',(req,res)=>{
    if(req.body._id == ''){
        insertRow(req,res);   
    }else{
        updateRow(req,res);
    }
})
routes.get('/list',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){
            //console.log(data);
            res.render('employees/employeeList',{panelHeading: 'Employee List', list :docs});
        }
    }).lean();
});
routes.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,docs)=>{
        //console.log(docs);
        if(!err){
            res.redirect('employee/list');
        }
    }).lean();
});
routes.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove({_id: req.params.id},(err,docs)=>{
        if(!err){
            res.render('employees/employeeList',{panelHeading: 'Employee List'});
        }else{
            console.log('Cant deleted '+ err);
        }
    })
});
function insertRow(req,res){
    const employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,data)=>{
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render('employees/addEditEmployee',{
                    title : 'Insert Employee',
                    employee : req.body
                });
            }
            //console.log('Error Cant insert data');
        }
    });
}
function updateRow(req,res){
    console.log(req.body);
    Employee.findOneAndUpdate({_id : req.body._id},req.body,{new : true},(err,doc)=>{  
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render('employees/addEditEmployee',{
                    title : 'Edit Employee',
                    employee : req.body
                });
            }
        }
    });
}
function handleValidationError(err,body){
    //console.log(err);
    for(fields in err.errors){
        //console.log(err.errors[fields].path);
        switch (err.errors[fields].path) {
            case 'fullname':
                body['fullNameError'] = err.errors[fields].message;
                break;
            case 'email':
                body['emailError'] = err.errors[fields].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[fields].message; 
                break;
            case 'city':
                body['cityError'] = err.errors[fields].message;    
                break;
        }
    }
}
module.exports=routes;