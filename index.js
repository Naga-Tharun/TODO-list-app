// npm install express
// npm install ejs
// npm install mongoose

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
    // if deadline not provided then set No dedline
    if(req.body.duedate == ''){
        req.body.duedate = "No Deadline";
    }

    Task.create({
        description: req.body.description,
        duedate: req.body.duedate,
        category: req.body.category,
        check: req.body.check
    }, function(err, newTask){
        if(err){
            console.log('Error in creating a task!');
            return;
        }

        console.log('************', newTask);
        return res.redirect('back');
    });
});

// for keeping list of marked tasks for deletion
app.get('/mark-task', function(req, res){
    console.log(req.query);

    // the id passed in link
    let id = req.query.id;

    // finding the object using id from query
    Task.find({_id: id}, function(err, task){
        if(err){
            console.log('Error in finding the object from database');
            return;
        }

        console.log(task[0].check);

        // marking the tasks
        if(!task[0].check){
            Task.findByIdAndUpdate(task[0].id, {check: true}, function(err){
                if(err){
                    console.log('Error in updating check of object from database');
                    return;
                }    
            });
        }
        else{
            Task.findByIdAndUpdate(task[0].id, {check: false}, function(err){
                if(err){
                    console.log('Error in updating check of object from database');
                    return;
                }
            });
        }
    });

    return res.redirect('back');
});

// deleting selected tasks
app.get('/delete-tasks', function(req, res){
    // return res.end('<h1> Delete clicked </h1>');

    Task.find({check: true}, function(err, tasks){
        if(err){
            console.log('Error in finding the checked objects from database');
            return;
        }

        // deleting the tasks
        for(let i of tasks){
            Task.findByIdAndDelete(i.id, function(err){
                if(err){
                    console.log('Error in deleting the checked objects from database');
                    return;
                }
            });
        }

    });

    return res.redirect('/');
});

// setup app.listen for checking if server is running without any error
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server in running on port: ${port}`);
});