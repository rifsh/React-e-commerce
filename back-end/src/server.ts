import app from '.';
import http from "http";
import { connection } from './db_connection'
import { errorHandler } from './middleware/errormiddlaware';
import { Server } from "socket.io";
import { WebSocketServer } from "ws";
import { Request, Response } from 'express';

connection();
app.use(errorHandler);

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws) => {
    console.log("Connected");
    ws.on('message', (mess) => {
        console.log("Message", mess);
        ws.send(`hello you send -> ${mess}`)
    })
})


server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})

