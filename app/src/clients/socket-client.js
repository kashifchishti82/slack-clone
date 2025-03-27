import { io } from "socket.io-client";
class SocketServiceClass {
    constructor() {
        this.client = null;
        this.subscriptions = {};
    }

    connect() {
        this.client =  io("ws://localhost:3214");
        this.client.connect();
        this.client.on("connect", () => {
          console.log('connected');
        });
    }
    publishMessage(message) {
        if (!this.client || !this.client.connected) return;
        this.client.emit("sendMessage", JSON.stringify(message));
    }

    onMessage(handler) {
        this.client.on("chat.message", handler);
    }
    joinWorkspace(workspaceId) {
        if (!this.client || !this.client.connected) return;
        this.client.emit("joinWorkspace", workspaceId);
    }

    disconnect() {
        if (this.client) {
            this.client.disconnect();
        }
    }
}

const socketService = new SocketServiceClass();
export default socketService;