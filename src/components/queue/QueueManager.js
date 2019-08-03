import React from "react"

export default class QueueManager {

    state = {
        playingContext = {
            track: null,
            user: null,
            startTimestamp: null
        },
        queue: [],
        onQueueChanged = options.onQueueChanged,
        onQueueEnded = options.onQueueEnded,
        onPlay = options.onPlay,
        getToken = options.getToken,
        spotifyApi = options.spotifyApi,
        playedHistory = []
    }

    handleQueueChanged() {
        this.sort();
        this.save();
        this.onQueueChanged();
    }
    getPlayingContext() {
        return this.playingContext;
      }

    getQueue() {
    return this.queue;
    }

    sort() {
    this.queue.sort((a, b) => {
        const diffVoters = b.voters.length - a.voters.length;
        if (diffVoters !== 0) {
        return diffVoters;
        } else {
        return a.queuedTimestamp - b.queuedTimestamp;
        }
    });
    }

    addItem(queueItem) {
    this.queue.push(queueItem);
    this.handleQueueChanged();
    if (this.playingContext.track === null) {
        this.play();
    }
    }

    removeId(user, id) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index !== -1 && this.queue[index].user.id === user.id) {
        this.queue.splice(index, 1);
        this.handleQueueChanged();
    }
    }

    init() {
    this.play();
    }

    play() {
    console.log('api.js > play');
    if (this.queue.length > 0) {
        console.log('api.js > play has queue');
        // something to play!
        const queueItem = this.queue.shift();
        this.handleQueueChanged();
        this.playingContext = {
        track: queueItem.track,
        user: queueItem.user,
        startTimestamp: Date.now(),
        voters: queueItem.voters
        };
        this.playedHistory.push({
        track: queueItem.track,
        user: queueItem.user
        });
        setTimeout(() => {
        this.play();
        }, 2000 + queueItem.track.duration_ms);
        this.onPlay();
    } else {
        this.playingContext = {
        track: null,
        user: null,
        startTimestamp: null,
        voters: []
        };

        this.onQueueEnded();
    }
    }

    voteUpId(user, id) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index === -1) return false;
    const voters = this.queue[index].voters;
    if (voters) {
        const userVotes = voters.filter(v => v.id === user.id);
        if (userVotes.length === 0) {
        this.queue[index].voters.push(user);
        this.handleQueueChanged();
        return true;
        }
    }
    }

    // This is supposed to save to JSON
    save() {
    fs.writeFileSync(
        './queue.json',
        JSON.stringify({
        playingContext: this.playingContext,
        queue: this.queue
        }),
        ''
    );
    }
    // This pulls data from JSON
    read() {
    try {
        const data = JSON.parse(fs.readFileSync('./queue.json'));
        this.playingContext = data.playingContext;
        this.queue = data.queue;
    } catch (e) {
        // do nothing;
    }
    }
}

