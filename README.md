# Chat App

## Description

This application is a simple chat server and client implemented in Node.js. The server accepts multiple concurrent client connections and relays messages between them. Concurrency is handled by Node.js's event-driven architecture; each client connection triggers an event, and messages are processed as they arrive.

The application is divided into two parts: the server and the client. The server is responsible for accepting connections and relaying messages, while the client is responsible for sending and receiving messages.

## Assumptions and Design Choices

- **Assumption**: We assume that the server and clients are running on the same machine, hence the use of '127.0.0.1' as the default IP address. If you want to run the server and clients on different machines, you'll need to modify the IP address accordingly.
- **Design Choice**: We chose to use TCP for the networking protocol because it provides reliable, ordered, and error-checked delivery of a stream of bytes, which is suitable for a chat application.

## How to Run the Application

### Server

1. Navigate to the server directory.
2. Run `node server.js`.

### Client

1. Navigate to the client directory.
2. Run `node client.js`.

Please ensure that the server is running before you start the client application.

## Architecture

The server application listens for incoming connections. When a client connects, the server assigns it a unique ID and starts listening for messages from that client. When a message is received, the server relays it to all connected clients.

The client application connects to the server and then waits for user input. When the user enters a message, it is sent to the server, which then relays it to all other connected clients.