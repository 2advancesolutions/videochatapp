const express = require('express');
const app = express();

// Create Server
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

// create a new room dynamtically 
app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
});
app.get('/:room', (req, res) => {
    // TODO save local storage 
    res.render('room', { roomId: req.params.room });
});

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
     // Join room id
     socket.join(roomId);
     // send message to room
     socket.broadcast.to(roomId).emit('user-connected', userId);
    });
});

// start server
server.listen(3000);


