// connects to the root path
const socket =  io('/');
let videoGrid = document.getElementById('video-grid');


var peer = new Peer(undefined, {
    host:'/', 
    port: '3001'
});

const myVideo = document.createElement('video');
// mute or video to prevent echo
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})


socket.on('user-connected', userId => {
    console.log('user connected ' + userId);
})

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
    video.play();
    });
    videoGrid.append(video)
}