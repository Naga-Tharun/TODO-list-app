// including express
const express = require('express');
const app = express();
// setting up the port
const port = 8000;
// middleware body parser
const bodyParser = require('body-parser');

// for database
const db = require('./config/mongoose');
const Task = require('./models/task');

// using express router
app.use('/', require('./routes'));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false}));
// for acceessing static files in assets folder
app.use(express.static('assets'));

// creating a post reequest for adding a task
app.post('/create-task', function(req, res){
    console.log(req.body.category);
    Task.create({
        description: req.body.description,
        duedate: req.body.duedate,
        category: req.body.category
    }, function(err, newTask){
        if(err){
            console.log('Error in creating a task!');
            return;
        }

        console.log('************', newTask);
        return res.redirect('back');
    });
});

// deleting selected tasks
app.get('/delete-tasks', function(req, res){
    return res.render('<h1> Delete clicked </h1>');
});

// setup app.listen for checking if server is running without any error
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server in running on port: ${port}`);
});