# Todo Application - Full Stack

A complete full-stack Todo application built with React.js frontend and Node.js/Express backend, designed based on the provided wireframe specifications.

## Features

- **Add Tasks**: Create new tasks with name, description, and status
- **View All Tasks**: Display all tasks in a clean table format
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Task Summary**: Real-time summary showing counts by status
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Visual feedback during API operations

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and responsive design

## Project Structure

```
todo-app-fullstack/
├── package.json                 # Root package.json with scripts
├── server/                      # Backend application
│   ├── package.json            # Server dependencies
│   └── index.js                # Express server with API routes
├── client/                      # Frontend React application
│   ├── package.json            # Client dependencies
│   ├── public/
│   │   └── index.html          # HTML template
│   └── src/
│       ├── index.js            # React entry point
│       ├── App.js              # Main App component
│       ├── App.css             # Global styles
│       └── components/
│           ├── AddTask.js      # Add task form component
│           ├── TasksTable.js   # Tasks display table component
│           └── TasksSummary.js # Summary statistics component
└── README.md                   # This file
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/summary/counts` - Get task summary counts
- `GET /api/health` - Health check

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Quick Start

1. **Clone or download the project**
   ```bash
   cd todo-cline-ai
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install all dependencies (server + client)**
   ```bash
   npm run install-all
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and React frontend (port 3000) concurrently.

### Manual Setup

If you prefer to run the servers separately:

1. **Start the backend server**
   ```bash
   npm run server
   ```
   Server will run on http://localhost:5000

2. **Start the frontend (in a new terminal)**
   ```bash
   npm run client
   ```
   React app will run on http://localhost:3000

## Usage

1. **Access the application** at http://localhost:3000
2. **Add new tasks** using the "Add Task" form:
   - Enter task name and description
   - Select status (Not Started, In Progress, Completed)
   - Click "Add Task"
3. **View all tasks** in the table below the form
4. **Delete tasks** by clicking the "Delete" button (with confirmation)
5. **Monitor progress** with the real-time summary at the bottom

## Sample Data

The application comes pre-loaded with 6 sample tasks to demonstrate functionality:
- 2 tasks "In Progress"
- 1 task "Not Started" 
- 3 tasks "Completed"

## Development Scripts

- `npm run dev` - Start both server and client in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the React frontend
- `npm run install-all` - Install dependencies for both server and client
- `npm run build` - Build the React app for production

## Design Features

The application closely follows the provided wireframe with:
- Clean, professional styling
- Bordered sections matching the wireframe layout
- Color-coded status indicators
- Responsive table design
- Form validation and error handling
- Loading states and user feedback

## Data Storage

Currently uses in-memory storage on the server. Data will reset when the server restarts. For production use, integrate with a database like MongoDB, PostgreSQL, or MySQL.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development purposes.
