const Task = require("../models/task");

// redirects to home view
module.exports.home = function(req, res){

    Task.find({}, function(err, tasks){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title: "TODO list",
            tasks_list: tasks
        });
    });
};