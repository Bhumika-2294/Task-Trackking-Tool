const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json())
mongoose.connect("mongodb+srv://Bhumikarathore:Bhumika123@cluster0.by0ybgm.mongodb.net/Test?retryWrites=true&w=majority").then(() => {
    console.log("Connected")
});
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const taskSchema = new mongoose.Schema({
    username: String,
    description: String,
    assignee: String,
    email: String,
    due_date: String,
    priority: String
})
const User = new mongoose.model('tasky', userSchema);
const Task = new mongoose.model('task', taskSchema);
app.route('/api/v1/taskyUsers').post(async(req, res) => {
    const credentials = req.body;
    const user = await User.create(credentials);
    console.log(user)
    res.status(200).json(user);
});

app.route('/api/v1/taskyUsers/login').post(async(req, res) => {
    const credentials = req.body;
    const user = await User.findOne(credentials);
    console.log(user)
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({
            status: "failed"
        })
    }
})

app.route('/api/v1/taskyUsers/tasks').post(async(req, res) => {
    const tasks = req.body;
    const task = await Task.create(tasks);
    console.log(task);
    res.status(200).json(task);
}).get(async(req, res) => {
    const name = req.query.name;
    const data = await Task.find({ username: name })
    if (data) {
        res.status(200).json(data);
    }
}).delete(async(req, res) => {
    const id = req.body.id;
    const deleteTask = await Task.findOneAndDelete({ description: id });
    console.log(deleteTask);
    res.status(200).json({
        status: "Success"
    })
});


app.listen(port, () => {
    console.log(`app is listening to port ${port}`);
});