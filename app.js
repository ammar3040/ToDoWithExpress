const express = require('express');
const path = require('path');
const app = express();
const PORT = 8001;

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Initial task data
let tasks = [
    {
        title: "Complete Project",
        // priority: "High",
        // deadline: "2023-12-31"
    }
];

// Routes
app.get('/', (req, res) => {
    res.render('dashboard', {
        taskItems: tasks,
        pageTitle: "Task Dashboard"
    });
});

// Add new task
app.post('/createTask', (req, res) => {
    tasks.push({
        title: req.body.title,
        // priority: req.body.priority,
        // deadline: req.body.deadline
    });
    res.redirect('/');
});

// Delete task
app.get('/deleteTask/:id', (req, res) => {
    tasks.splice(req.params.id, 1);
    res.redirect('/');
});

// Edit task - display form
app.get('/editTask', (req, res) => {
    const taskIndex = req.query.index;
    const taskToEdit = tasks[taskIndex];
    res.render('taskEditor', {
        task: taskToEdit,
        taskIndex: taskIndex
    });
});

// Edit task - process form
app.post('/updateTask', (req, res) => {
    tasks[req.body.taskIndex] = {
        title: req.body.title,
        // priority: req.body.priority,
        // deadline: req.body.deadline
    };
    res.redirect('/');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("<h1>Page Not Found</h1>");
});

// Start server
app.listen(PORT, (err) => {
    if (err) {
        console.error("Server error:", err);
    } else {
        console.log(`Task manager running on port ${PORT}`);
    }
});