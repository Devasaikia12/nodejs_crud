const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullname : {type:String ,required : 'Full Name cant be empty'},
    email : {type :String},
    mobile : {type :Number},
    city :{ type:String}
});
// employeeSchema.path('email').validate((val)=>{
//     var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
//     return reg.test(email); 
// },'Invalid Email');
mongoose.model('Employee',employeeSchema);