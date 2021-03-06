import React, { Component } from "react"
import Spotify from "spotify-web-api-js"
import "./MusicPlayer.css"
import { Grid, Icon, Progress } from 'semantic-ui-react'
// import PlaylistView from "../playlist/PlaylistView";

const spotifyAPI = new Spotify()

export default class MusicPlayer extends Component {
    state = {
        isPlaying: false,
        deviceId: "",
        position: null,
        duration: null,
        progressBarValue: 0,
        trackURI: "",
        // queue: []
    }
  //   milisToMinutesAndSeconds = (mil) => {
  //     const minutes = Math.floor(mil / 60000);
  //     const seconds = ((mil % 60000) / 1000).toFixed(0);
  //     return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  // };
    connectPlayer () {
        const token = this.props.token
        // console.log(token)
        if (window.Spotify) {
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
          window.location = "http://localhost:3000/login"
        });
        this.player.on('account_error', e => {
          console.error(e);
          // window.location = "http://localhost:3000/login"
        });
        this.player.on('playback_error', e => {
          console.error(e);
          console.log("playback error")
          // window.location = "http://localhost:3000/login"
        });

        // Playback status updates
        this.player.on("player_state_changed", state => {
          // console.log("player state", state)
          if (state.paused === true && state.position === 0 && state.disallows.pausing){
            this.props.playNext();
          }
          this.onStateChanged(state)
          this.props.getNowPlaying()


        });

        // Ready
        this.player.on('ready', data => {
          let device_id = data.device_id;
          console.log("Player ready")
          this.setState({ deviceId: device_id }, () => {
            // this.transferPlaybackHere(this.state.deviceId.device_id)
            this.transferPlaybackToApp(this.state.deviceId)
            sessionStorage.setItem("device_id", this.state.deviceId)
          });
          this.positionCheckInterval = setInterval(() => {
            this.checkPositionChange()
          }, 1000)
        });
    }


  // playNext = () => {
  //   if (this.props.queue.length > 0){
  //     // console.log("Playing next song");
  //     this.props.playSong(this.props.queue[1].song_uri);
  //     this.props.queue.shift();
  //   //Changed index to 1 to play second song after clicking first play button. Using reduce is and option to add more control
  //   }
  // }

  onSeekChange = (e, val) => {
    let dur = this.state.duration;
    let seek = Math.floor((val * dur) / 100); // round number
    this.setState({ progressBarValue: val });
    this.player.seek(seek).then(() => {
        // console.log(`Seek song to ${seek} ms`);
    });
  }

    checkPositionChange = () => {
        spotifyAPI.getMyCurrentPlaybackState()
          .then(data => {
            if (this.state.isPlaying === true) {
              // console.log("get current playback state - player", data)
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
        const artistName = currentTrack.artists[0].name
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
    onPrevClick = (event) => {
      event.preventDefault()
      this.player.previousTrack();
    }

    onPlayClick = (event) => {
      event.preventDefault()
      this.player.togglePlay();
    }

    onNextClick = (event) => {
      event.preventDefault()
      this.props.playNext()
      // this.player.nextTrack();
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
          // console.log("device id in state", this.state.deviceId)
        )
    }
    componentDidMount () {
      this.playerCheckInterval = setTimeout(() =>
        this.connectPlayer(), 1000
      )


        // this.getNowPlaying()
        // this.playerCheckInterval = setInterval(() =>
        //   this.connectPlayer(), 1000
        // )
      }
    render () {
      console.log(this.state.isPlaying)
        // const progressBarStyles = {width: (this.state.progressBarValue) + '%'}
        return (
            <Grid.Row className="control-container">
                <Grid.Row className="playing-status">
                {/* <MusicPlayer {...this.props} Spotify={this.spotifyAPI} params={this.getHashParams()}/> */}
                    {this.state.isPlaying ? "Playing" : "Paused"}
                    {/* <Grid.Row className="progress-bar" style={progressBarStyles} /> */}
                    <Progress percent={this.state.progressBarValue} onClick={this.onSeekChange} size='small' color='green' style={{marginLeft: 190}}inverted>
                      <div id="range-1" className="ui range"></div>
                    </Progress>
                </Grid.Row>
                <Grid.Row className="player-buttons-container">
                    <button className="player-button" onClick={this.onPrevClick}>
                      <Icon name='step backward' size='large' color='grey'></Icon>
                    </button>
                    <button className="player-button" onClick={this.onPlayClick}>
                      {this.state.isPlaying ? <Icon name="pause circle outline" color='grey' size="huge" ></Icon> : <Icon name="play circle outline" color='grey' size="huge" ></Icon>}
                    </button >
                    <button className="player-button" onClick={this.onNextClick}>
                      <Icon name='step forward' size='large' color='grey'></Icon>
                    </button>
                </Grid.Row>
            </Grid.Row>
        )
        // <Icon name="play circle outline" onClick={this.onPrevClick}></Icon>
    }

}