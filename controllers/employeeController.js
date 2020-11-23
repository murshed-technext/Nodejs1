const express = require('express')
const { mongo } = require('mongoose')

const router = express.Router()

const Employee =  require('../models/employee.model')


router.get('/',(req,res)=>{
    res.render("employee/addOrEdit",{
        viewTitle:"Insert Employee"
    })
})
router.post('/',(req,res)=>{
    if(req.body._id == '') inserRecord(req,res);
    else updateRecord(req,res);
    
})

function inserRecord(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc)=>{
        if(!err){
            res.redirect('employee/list')
        }
        else console.log('ERROR : ' + err);
    });
}

function updateRecord(req,res){
    console.log('Update function is working now')
    // req = JSON.parse(JSON.stringify(req));
    console.log(req.body);
    Employee.findByIdAndUpdate({_id:req.body._id},req.body,{new :true},(err,docs)=>{
            if(!err){
                res.redirect('employee/list')
            }
            else console.log('ERROR : ' + err);
    })
}
router.get('/list',(req,res)=>{
    Employee.find((err,docs)=>{
        // for(var i =0;i<docs.length;i++)
        // {
        //     console.log("test: " + i);
        //     console.log(docs[i].fullName);
        //     console.log(docs[i].email);
        //     console.log(docs[i].mobile);
        //     console.log(docs[i].city);
        // }
        // docs.forEach(element => {
        //     console.log("test: ----------");
        //     console.log(element.fullName);
        //     console.log(element.email);
        //     console.log(element.mobile);
        //     console.log(element.city);
        // });
        // const temp=[
        //             {
        //                 'name': 'murshed',
        //                 'email': 'a.com',
        //                 'mobile': '012'
        //             },
        //             {
        //                 name: 'rashed',email: 'a.com',mobile: '012'
        //             },
        //             {
        //                 name: 'tanvir',
        //                 email: 'a.com',
        //                 mobile: '012'
        //             }
        //         ]
        // console.log(typeof(docs))
        var docs = JSON.parse(JSON.stringify(docs));
        if(!err){
            res.render('employee/list',{
                showData:"Employee Data",
                lists: docs,
                // temp:temp
            });
        }
        else{
            console.log('Error in retrieving employee list :' + err);
        }
    })
})

router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,docs)=>{
        // docs = JSON.parse(JSON.stringify(docs));
        console.log(docs);
        if(!err){
            var docs = JSON.parse(JSON.stringify(docs));
            res.render('employee/addOrEdit',{
                viewTitle:"Update Employee",
                employee:docs
            })
        }
    })
})


router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id, (err,docs)=>{
        if(!err){
            res.redirect('/employee/list')
        }
        else console.log('ERROR :' + err)
    })
})



module.exports = router