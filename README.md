# grpc-task-manager
# 🛠️ gRPC Task Manager (Node.js)

This is a simple gRPC-based Task Manager application built with Node.js. It provides full CRUD operations using `@grpc/grpc-js` and Protocol Buffers, and mimics typical RESTful functionality in a gRPC architecture.

---

## 📦 Tech Stack

| Tool                    | Purpose                                 |
|-------------------------|-----------------------------------------|
| @grpc/grpc-js           | gRPC implementation for Node.js         |
| @grpc/proto-loader      | Load `.proto` files into Node.js        |
| uuid                    | Generate unique task IDs                |
| fs (optional)           | File-based persistence (future upgrade) |

---

## 📁 Folder Structure

grpc-task-manager/
├── proto/
│ └── task.proto # gRPC service and message definitions
├── server/
│ ├── index.js # gRPC server setup and service registration
│ └── task.service.js # Implementation of all task CRUD logic
├── client/
│ └── client.js # Command-line client to test gRPC methods
├── tasks.json # (Optional) For file-based persistence
├── .gitignore
├── package.json


---

## 📜 Proto File – `proto/task.proto`

```proto
syntax = "proto3";

package task;

import "google/protobuf/empty.proto";

message Task {
  string id = 1;
  string title = 2;
  string description = 3;
  bool completed = 4;
}

message TaskId {
  string id = 1;
}

message TaskInput {
  string title = 1;
  string description = 2;
}

message TaskUpdate {
  string id = 1;
  string title = 2;
  string description = 3;
  bool completed = 4;
}

service TaskService {
  rpc CreateTask(TaskInput) returns (Task);
  rpc GetTask(TaskId) returns (Task);
  rpc ListTasks(google.protobuf.Empty) returns (stream Task);
  rpc UpdateTask(TaskUpdate) returns (Task);
  rpc DeleteTask(TaskId) returns (google.protobuf.Empty);
}
🚀 How to Run

1. Clone the repo and install dependencies
git clone https://github.com/your-username/grpc-task-manager.git
cd grpc-task-manager
npm install
2. Start the gRPC Server
node server/index.js
You should see:

🚀 gRPC server running at 0.0.0.0:50051
3. Open a new terminal and test using the client
➕ Create a Task

node client/client.js create "Learn gRPC" "Understand streaming and unary calls"
📋 List All Tasks

node client/client.js list
🔍 Get a Task by ID

node client/client.js get <task_id>
🔄 Update a Task

node client/client.js update <task_id> "Updated Title" "Updated Desc" true
❌ Delete a Task

node client/client.js delete <task_id>
✅ What You’ll Learn

How gRPC differs from REST
How to define services and messages with .proto files
How to implement unary and streaming RPCs
How to build a gRPC server and client in Node.js
How to separate logic into layers like services and transport