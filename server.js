require('./models/db')

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')


var app = express();

app.use(bodyparser.urlencoded({
    extended:false
}));
app.use(bodyparser.json())

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname+'/views/layouts/'
}))
app.set('view engine','hbs');

app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.render('homepage/home',{
        layout:'home'
    })
});
app.use('/employee',require('./controllers/employeeController'));



const port = 3000;
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});