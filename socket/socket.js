const amqp = require("amqplib");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const {json} = require("express");

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
        origin: '*', // Adjust this for security
    }
});
let consumerStartedFor = [];

let channelConnected = null;
async function getChannel(){
    if(!channelConnected){
        const connection = await amqp.connect('amqp://root:1q2w3e4r5t@localhost');
        channelConnected = await connection.createChannel();
    }
    return channelConnected;
}
async function startConsumer(exchange, queue) {
    const channel = await getChannel();
    console.log(`Listening for messages on workspace ${exchange}...`);
    channel.consume(queue, (msg) => {
        console.log(`Received message: ${msg.content.toString()}`);
        io.emit('chat.message', msg.content.toString());
       console.log("I have received a message",msg.content.toString())
    }, { noAck: true });
}

function getWorkspaceName(workspaceId){
    return `workspace.${workspaceId}`;
}
function getQueueName(workspaceId){
    return `workspace.${workspaceId}.messages`;
}
async function startWorkspaceConsumer(workspaceId) {
    if(consumerStartedFor.includes(workspaceId)) return;
    console.log(`Starting consumer for workspace ${workspaceId}...`);
    const exchange = getWorkspaceName(workspaceId);
    const queue = getQueueName(workspaceId);
    console.log(exchange,queue)
    await startConsumer(exchange, queue);
    consumerStartedFor.push(workspaceId);
}

async function sendMessage(payload) {
    const channel = await getChannel();
    const message =   JSON.parse(payload)
    const workspaceId = message['workspaceId'];
    const exchange = getWorkspaceName(workspaceId);
    const queue = getQueueName(workspaceId);
    channel.publish(exchange, 'chat.message', Buffer.from(payload));
}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinWorkspace', async (workspaceId) => {
         await startWorkspaceConsumer(workspaceId);
    });

    socket.on('sendMessage', async (message) => {
        await sendMessage(message);
    });

    socket.on('typing', ({ room, username }) => {
        socket.to(room).emit('userTyping', { username });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
server.listen(3214, () => console.log("Socket.IO server running on port 3000"));