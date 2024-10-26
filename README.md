
# TaskTracks

TaskTracks is a simple task management application that allows users to create, update, delete, and track their tasks. Designed with flexibility in mind, TaskTracks plans to supports both personal task management and team collaboration, with plans to expand functionality further.

## Features

### Current Features
- **CRUD Operations**: Create, Read, Update, and Delete tasks.


### Planned Features
- **Task Categorization**: Organize tasks based on categories or priorities.
- **User Authentication**: Basic user authentication to manage personal tasks.
- **Team Collaboration**: Share tasks and responsibilities with team members for larger projects.
- **Task History Tracking**: View task history statistics, including:
  - Tasks completed on time.
  - Tasks completed late.
  - Uncompleted tasks.
  - Postponed tasks.
  - Tasks canceled by the organizer (won't affect user metrics).
- **Graphical Insights**:
  - Personal task metrics (individual performance).
  - Team task metrics (collaborative performance without overshadowing personal metrics).

## Tech Stack

- **M**ongoDB: The NoSQL database used to store and manage application data in a flexible, schema-less format.

- **E**xpress.js: The lightweight and robust Node.js framework, designed for building fast, scalable APIs and server-side logic.

- **R**eact: The powerful front-end JavaScript library used to create dynamic user interfaces and handle client-side interactions.

- **N**ode.js: The high-performance, event-driven runtime environment that powers the server and facilitates seamless JavaScript execution across the stack.



## Folder Structure

```bash
taskTracks/
│
├── backend/                     # Backend server files
│   ├── database.json            # The Database
│   ├── db.js                    # Reads and Writes to Database
│   ├── .env                     # Environment variables
│   ├── server.js                # Main entry point for the server
│   └── package.json             # Backend dependencies
│
├── frontend/                    # Frontend app files
│   ├── public/                  # 
│   ├── src/                     # Source code for the frontend
│   │   ├── components/          # React components
│   │   │   ├── TaskForm.jsx     # Form for adding tasks
│   │   │   ├── TaskItem.jsx     # Individual task item display
│   │   │   ├── TaskList.jsx     # List of tasks
│   │   │   └── Form.css         # CSS styles for TaskForm.jsx
│   │   ├── App.jsx              # Main application component
│   │   ├── App.css              # CSS styles for the app
│   │   └── main.jsx             # 
│   └── package.json             # Frontend dependencies
└── README.md                    # Project documentation
```

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:Alucardetat/tasksTracks.git
   cd taskTracks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the app in your browser at `http://localhost:3000`.

## Contributing
Feel free to submit issues or pull requests for bug fixes, features, or improvements.


Made with ❤️ by Alucardetat
