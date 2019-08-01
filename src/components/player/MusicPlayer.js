import React, { Component } from "react"
import Spotify from "spotify-web-api-js"
import "./MusicPlayer.css"

const spotifyAPI = new Spotify();

export default class MusicPlayer extends Component {
    state = {
        isPlaying: false,
        deviceId: "",
        position: null,
        duration: null,
        progressBarValue: 1,
    }

    connectPlayer () {

        const token = this.props.token
        console.log(token)
        if (window.Spotify !== null) {
          clearInterval(this.playerCheckInterval)
          this.player = new window.Spotify.Player({
                  name: 'Web Playback SDK Quick Start Player',
                  getOAuthToken: cb => {
                      cb(token)
                  }
              });
          console.log("connected")
          this.createEventHandlers()
          this.player.connect()
        }
    }

    createEventHandlers() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
          console.error(e);
          this.setState({ loggedIn: false });
        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });

        // Playback status updates
        this.player.on("player_state_changed", state => {
          console.log("player state", state)
          this.onStateChanged(state)
          this.props.getNowPlaying()
        });

        // Ready
        this.player.on('ready', data => {
          let device_id = data;
          console.log("Player ready")
          this.setState({ deviceId: device_id }, () => {
            // this.transferPlaybackHere(this.state.deviceId.device_id)
            this.transferPlaybackToApp(this.state.deviceId.device_id)
          });
          this.positionCheckInterval = setInterval(() => {
            this.checkPositionChange()
          }, 1000)
        });
    }

    checkPositionChange = () => {
        spotifyAPI.getMyCurrentPlaybackState()
          .then(data => {
            if (this.state.isPlaying) {
              console.log("get current playback state - player", data)
              let duration = data.item.duration_ms
              let progress = data.progress_ms
              // console.log(data.progress_ms)
              let position = ((progress * 100) / duration)
              if (position !== this.state.progressBarValue) {
                this.setState({
                  progressBarValue: position
                })
              }
            }

        })
    }
    onStateChanged(state) {
        // if you're no longer listening to music, you'll get a null state.
      if (state !== null) {
        const {
          current_track: currentTrack,
          position,
          duration,
        } = state.track_window;
        const trackName = currentTrack.name;
        const albumName = currentTrack.album.name;
        const artistName = currentTrack.artists
          .map(artist => artist.name)
          .join(", ");
        const isPlaying = !state.paused;
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          isPlaying
        });
      }
    }
    onPrevClick = () => {
      this.player.previousTrack();
    }

    onPlayClick = () => {
      this.player.togglePlay();
    }

    onNextClick = () => {
      this.player.nextTrack();
    }
    // transferPlaybackHere() {
    //   const token = this.getHashParams().access_token
    //   const deviceId = this.state.deviceId.device_id
    //   console.log("device id in state", this.state.deviceId.device_id)
    //   fetch("https://api.spotify.com/v1/me/player", {
    //     method: "PUT",
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       "device_ids": [ deviceId ],
    //       "play": true,
    //     }),
    //   });
    // }
    transferPlaybackToApp(id) {
      var deviceIds = [id]
      spotifyAPI.transferMyPlayback(deviceIds)
        .then(
          console.log("device id in state", this.state.deviceId.device_id)
        )
    }
    componentDidMount () {
        // this.getNowPlaying()
        this.playerCheckInterval = setInterval(() =>
          this.connectPlayer(), 1000
        )
      }
    render () {
        const progressBarStyles = {width: (this.state.progressBarValue) + '%'}
        return (
            <div className="player-container">
                <div className="playing-status">
                {/* <MusicPlayer {...this.props} Spotify={this.spotifyAPI} params={this.getHashParams()}/> */}
                    {this.state.isPlaying ? "Playing" : "Paused"}
                    <div className="progress-bar" style={progressBarStyles} />
                </div>
                <div className="player-buttons">
                    <button onClick={this.onPrevClick}>Previous</button>
                    <button onClick={this.onPlayClick}>{this.state.isPlaying ? "Pause" : "Play"}</button>
                    <button onClick={this.onNextClick}>Next</button>
                </div>
            </div>
        )
    }

}