const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/EmployeeDB',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false},(err)=>{
    if(!err) {
        console.log("Mongodb connected.");
    }else { console.log("ERROR : " + err)}
})

require('./employee.model')