import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddTask from './components/AddTask';
import TasksTable from './components/TasksTable';
import TasksSummary from './components/TasksSummary';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData);
      setTasks([...tasks, response.data]);
      return { success: true };
    } catch (err) {
      console.error('Error adding task:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to add task' };
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      return { success: true };
    } catch (err) {
      console.error('Error deleting task:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to delete task' };
    }
  };

  // Update task
  const updateTask = async (taskId, taskData) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, taskData);
      setTasks(tasks.map(task => task.id === taskId ? response.data : task));
      return { success: true };
    } catch (err) {
      console.error('Error updating task:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to update task' };
    }
  };

  // Calculate summary
  const getSummary = () => {
    return {
      'In Progress': tasks.filter(task => task.status === 'In Progress').length,
      'Not Started': tasks.filter(task => task.status === 'Not Started').length,
      'Completed': tasks.filter(task => task.status === 'Completed').length
    };
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Todo Application</h1>
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={fetchTasks} className="retry-btn">Retry</button>
          </div>
        )}

        <AddTask onAddTask={addTask} />
        
        <TasksTable 
          tasks={tasks} 
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
        
        <TasksSummary summary={getSummary()} />
      </div>
    </div>
  );
}

export default App;
