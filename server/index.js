const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for tasks
let tasks = [
  { id: 1, name: 'Raise a PR', description: 'Create pull request for new feature', status: 'In Progress' },
  { id: 2, name: 'Review Code', description: 'Review team member code changes', status: 'In Progress' },
  { id: 3, name: 'Setup Database', description: 'Configure production database', status: 'Not Started' },
  { id: 4, name: 'Write Tests', description: 'Add unit tests for new components', status: 'Completed' },
  { id: 5, name: 'Deploy App', description: 'Deploy application to production', status: 'Completed' },
  { id: 6, name: 'Update Documentation', description: 'Update API documentation', status: 'Completed' }
];

let nextId = 7;

// Routes

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Get task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// Create new task
app.post('/api/tasks', (req, res) => {
  const { name, description, status } = req.body;
  
  if (!name || !description || !status) {
    return res.status(400).json({ message: 'Name, description, and status are required' });
  }

  const newTask = {
    id: nextId++,
    name,
    description,
    status
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { name, description, status } = req.body;
  
  if (!name || !description || !status) {
    return res.status(400).json({ message: 'Name, description, and status are required' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], name, description, status };
  res.json(tasks[taskIndex]);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

// Get task summary
app.get('/api/tasks/summary/counts', (req, res) => {
  const summary = {
    'In Progress': tasks.filter(t => t.status === 'In Progress').length,
    'Not Started': tasks.filter(t => t.status === 'Not Started').length,
    'Completed': tasks.filter(t => t.status === 'Completed').length
  };
  res.json(summary);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
