const express = require('express');
const path = require('path');
const app = express();
const PORT = 8001;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

let tasks = [
    {
        title: "Complete Project",
       
    }
];


app.get('/', (req, res) => {
    res.render('dashboard', {
        taskItems: tasks,
        pageTitle: "Task Dashboard"
    });
});

app.post('/createTask', (req, res) => {
    tasks.push({
        title: req.body.title,
  
    });
    res.redirect('/');
});


app.get('/deleteTask/:id', (req, res) => {
    tasks.splice(req.params.id, 1);
    res.redirect('/');
});

app.get('/editTask', (req, res) => {
    const taskIndex = req.query.index;
    const taskToEdit = tasks[taskIndex];
    res.render('taskEditor', {
        task: taskToEdit,
        taskIndex: taskIndex
    });
});


app.post('/updateTask', (req, res) => {
    tasks[req.body.taskIndex] = {
        title: req.body.title,

    };
    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(PORT, (err) => {
    if (err) {
        console.error("Server error:", err);
    } else {
        console.log(`Task manager running on port ${PORT}`);
    }
});
