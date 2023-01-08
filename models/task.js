const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    duedate: {
        type: Date,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;