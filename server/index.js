const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const taskService = require('./task.service');

// Load the .proto file
const PROTO_PATH = path.join(__dirname, '../proto/task.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

// Create a new gRPC server
const server = new grpc.Server();

// Register the TaskService with its implementation
server.addService(taskProto.TaskService.service, taskService);

// Start the server on port 50051
const PORT = '0.0.0.0:50051';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Server error:', err);
    return;
  }
  console.log(`🚀 gRPC server running at ${PORT}`);
  server.start();
});