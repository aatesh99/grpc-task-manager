const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the .proto definition
const PROTO_PATH = path.join(__dirname, '../proto/task.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

// Create the gRPC client
const client = new taskProto.TaskService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// --- Helper functions to test gRPC methods ---

function createTask(title, description) {
  client.CreateTask({ title, description }, (err, task) => {
    if (err) console.error('Error:', err.message);
    else console.log('✅ Task created:', task);
  });
}

function getTask(id) {
  client.GetTask({ id }, (err, task) => {
    if (err) console.error('Error:', err.message);
    else console.log('📋 Task:', task);
  });
}

function listTasks() {
  const call = client.ListTasks({});
  call.on('data', (task) => {
    console.log('📌', task);
  });
  call.on('end', () => {
    console.log('✅ Task list complete.');
  });
}

function updateTask(id, title, description, completed) {
  client.UpdateTask({ id, title, description, completed }, (err, task) => {
    if (err) console.error('Error:', err.message);
    else console.log('🔄 Task updated:', task);
  });
}

function deleteTask(id) {
  client.DeleteTask({ id }, (err, _) => {
    if (err) console.error('Error:', err.message);
    else console.log('❌ Task deleted');
  });
}

// --- CLI interface ---

const [,, method, ...args] = process.argv;

switch (method) {
  case 'create':
    createTask(args[0], args[1]);
    break;
  case 'get':
    getTask(args[0]);
    break;
  case 'list':
    listTasks();
    break;
  case 'update':
    updateTask(args[0], args[1], args[2], args[3] === 'true');
    break;
  case 'delete':
    deleteTask(args[0]);
    break;
  default:
    console.log(`
Usage:
  node client.js create "Title" "Description"
  node client.js get <task_id>
  node client.js list
  node client.js update <id> "New Title" "New Desc" <true|false>
  node client.js delete <task_id>
    `);
}