const { v4: uuidv4 } = require('uuid');

const tasks = []; // In-memory task store

const taskService = {
  // Create a new task
  CreateTask: (call, callback) => {
    const { title, description } = call.request;
    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
    };
    tasks.push(newTask);
    callback(null, newTask);
  },

  // Get a task by ID
  GetTask: (call, callback) => {
    const { id } = call.request;
    const task = tasks.find(t => t.id === id);
    if (task) {
      callback(null, task);
    } else {
      callback(new Error('Task not found'));
    }
  },

  // Stream all tasks (server-streaming)
  ListTasks: (call) => {
    tasks.forEach(task => {
      call.write(task);
    });
    call.end();
  },

  // Update a task by ID
  UpdateTask: (call, callback) => {
    const { id, title, description, completed } = call.request;
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.title = title;
      task.description = description;
      task.completed = completed;
      callback(null, task);
    } else {
      callback(new Error('Task not found'));
    }
  },

  // Delete a task by ID
  DeleteTask: (call, callback) => {
    const { id } = call.request;
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      callback(null, {}); // return Empty
    } else {
      callback(new Error('Task not found'));
    }
  },
};

module.exports = taskService;