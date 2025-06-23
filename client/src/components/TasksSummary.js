import React from 'react';

const TasksSummary = ({ summary }) => {
  return (
    <div className="summary-section">
      <h2>Tasks Summary</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>In Progress</td>
            <td>{summary['In Progress'] || 0}</td>
          </tr>
          <tr>
            <td>Not Started</td>
            <td>{summary['Not Started'] || 0}</td>
          </tr>
          <tr>
            <td>Completed</td>
            <td>{summary['Completed'] || 0}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TasksSummary;
