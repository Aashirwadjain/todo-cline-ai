import React, { useState } from 'react';

const TasksTable = ({ tasks, onDeleteTask, onUpdateTask }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeletingId(taskId);
      
      try {
        const result = await onDeleteTask(taskId);
        if (!result.success) {
          alert(result.error || 'Failed to delete task');
        }
      } catch (err) {
        alert('An unexpected error occurred');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case 'In Progress':
        return 'status-in-progress';
      case 'Not Started':
        return 'status-not-started';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="tasks-section">
        <h2>📋 All Tasks</h2>
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="no-tasks">
                No tasks added yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="tasks-section">
      <h2>📋 All Tasks</h2>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td className={getStatusClassName(task.status)}>
                {task.status}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                  disabled={deletingId === task.id}
                >
                  {deletingId === task.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
