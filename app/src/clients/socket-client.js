import { io } from "socket.io-client";
class SocketServiceClass {
  constructor() {
    this.client = null;
    this.subscriptions = {};
    this.handler = null;
  }

  connect() {
    this.client = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    this.client.connect();
    this.client.on("connect", () => {
      console.log("connected");
    });
  }
  publishMessage(message) {
    if (!this.client || !this.client.connected) return;
    this.client.emit("sendMessage", JSON.stringify(message));
  }

  onMessage(handler) {
    if (!this.handler) {
      this.handler = handler;
      this.client.on("chat.message", handler);
    }
  }
  joinChannel(channelId, workspaceId) {
    if (!this.client || !this.client.connected) return;
    this.client.emit("joinWorkspace", {
      channelId: channelId,
      workspaceID: workspaceId,
    });
  }

  disconnect() {
    if (this.client) {
      this.client.disconnect();
    }
  }
}

const socketService = new SocketServiceClass();
export default socketService;
