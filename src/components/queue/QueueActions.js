import Spotify from "spotify-web-api-js"
import QueueManager from "./QueueManager"
import SongItem from "./SongItem"

const queueManager = new QueueManager({
    onPlay: () => {
      const { track, user } = queueManager.getPlayingContext();
      // if one user logs in on multiple tabs, just send 'play track' message to one tab,
      // but need to send 'update now playing' to other tabs
      users.forEach(u => {
        u.socketIdArray.forEach((socketId, index) => {
          if (index === 0) {
            globalIo.to(socketId).emit('play track', track, user);
          } else {
            globalIo.to(socketId).emit('update now playing', track, user);
          }
        });
      });
    },
    onQueueChanged: () => {
      globalSocket && globalSocket.emit('update queue', queueManager.getQueue());
      globalSocket && globalSocket.broadcast.emit('update queue', queueManager.getQueue());
    },
    onQueueEnded: async () => {
      globalSocket && globalSocket.emit('update queue', queueManager.getQueue());
      globalSocket && globalSocket.broadcast.emit('update queue', queueManager.getQueue());

    }
  });