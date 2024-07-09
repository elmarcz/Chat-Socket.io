import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración
app.set('port', process.env.PORT || 3000);

// Archivos estáticos
app.use(express.static(join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('[WebSockets] New Connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit("chat:message", data)
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit("chat:typing", data)
    })
    
});

// Servidor
server.listen(app.get('port'), () => {
    console.log(`[SERVER] Server on port ${app.get('port')}`);
});
