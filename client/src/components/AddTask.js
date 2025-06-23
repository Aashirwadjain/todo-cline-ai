import React, { useState } from 'react';

const AddTask = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Not Started'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.description.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await onAddTask(formData);
      
      if (result.success) {
        // Reset form on success
        setFormData({
          name: '',
          description: '',
          status: 'Not Started'
        });
      } else {
        setError(result.error || 'Failed to add task');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-task-section">
      <h2>Add Task</h2>
      
      {error && (
        <div className="error-message" style={{ marginBottom: '15px' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Task Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter task name"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="add-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
