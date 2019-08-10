import React, { Component } from 'react';
import Spotify from "spotify-web-api-js"
import MusicPlayer from './MusicPlayer';
import { Grid, Container } from 'semantic-ui-react'
import './PlayStatus.css'



const spotifyAPI = new Spotify();

export default class PlayStatus extends Component {

  constructor() {
    super()
    // const params = this.getHashParams()
    // console.log(spotifyWebAPI.getMyCurrentPlaybackState())
    // console.log(params.refresh_token)
    const accessToken = sessionStorage.getItem("access_token")
    this.state = {
      loggedIn: accessToken !== "undefined" ? true : false,
      deviceId: "",
      progressBarValue: 1,
      tracks: [],
      nowPlaying: {
        name: "",
        artist: "",
        album: "",
        image: "",
        position: 0,
        duration: 0
      },

    }
    // if (this.props.token) {
    //   spotifyAPI.setAccessToken(this.props.token)
    // }
    this.playerCheckInterval = null
    this.positionCheckInterval = null
  }
  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }


  // getNowPlaying = () => {
  //   spotifyAPI.getMyCurrentPlaybackState()
  //     .then((response) => {
  //       console.log("Now playing response item", response.item)
  //       if(response) {
  //         this.setState({
  //           nowPlaying: {
  //               isPlaying: response.is_playing,
  //               progress: response.progress_ms,
  //               duration: response.item.duration_ms,
  //               name: response.item.name,
  //               artist: response.item.album.artists[0].name,
  //               album: response.item.album.name,
  //               image: response.item.album.images[0].url
  //             }
  //         });
  //       } else {
  //         // console.log("no track currently playing")
  //         this.setState({nowPlaying: {
  //           name: "no song currently playing"
  //         }})
  //       }
  //     })
  // }

  render() {
    // console.log("nowPlaying state progress", this.state.nowPlaying.progress)
    // console.log("nowPlaying state object", this.state.nowPlaying)
    // console.log("deviceId", this.state.deviceId)
    // console.log(this.props.token)

    // const progressBarStyles = {width: (this.state.progressBarValue) + '%'}
    // console.log(progressBarStyles)
    {/* <button onClick={() => this.getNowPlaying()}>
    Check Now Playing
  </button> */}
    return (


    <React.Fragment>

      <Container className="player-container" fluid style={{width: 250}}>
        <div className="play-info">
          <img src={ this.props.nowPlaying.image } style={ {width: 150} } alt={this.props.nowPlaying.album}/>
          <div className='song-details'>
            <strong>{ this.props.nowPlaying.name }</strong>
            <br />
            {this.props.nowPlaying.artist}
            <br />
            {this.props.nowPlaying.album}
          </div>
        </div>

      {/* <Container fluid>
            <Grid.Row className="music-player">
              <MusicPlayer {...this.props} token={this.props.token}
                getNowPlaying={this.getNowPlaying}
                queue={this.props.queue} />
            </Grid.Row>
      </Container> */}
</Container>
    </React.Fragment>
    )
  }
}



