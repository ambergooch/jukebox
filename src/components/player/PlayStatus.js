import React, { Component } from 'react';
import Spotify from "spotify-web-api-js"
import MusicPlayer from './MusicPlayer';
// import SearchSong from "./components/SearchSong"


const spotifyAPI = new Spotify();

export default class PlayStatus extends Component {

  constructor() {
    super()
    const params = this.getHashParams()
    // console.log(spotifyWebAPI.getMyCurrentPlaybackState())
    // console.log(params.refresh_token)
    this.state = {
      loggedIn: params.access_token ? true : false,
      deviceId: "",
      searchTerm: "",
      progressBarValue: 1,
      tracks: [],
      nowPlaying: {
        name: "Not checked",
        artist: "",
        album: "",
        image: "",
        position: 0,
        duration: 0
      },

    }
    if (params.access_token) {
      spotifyAPI.setAccessToken(params.access_token)
    }
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

  searchTracks = (searchTerm) => {
    spotifyAPI.searchTracks(searchTerm)
      .then((data) => {
        console.log("Search for 'tracks' results", data.tracks.items)
        this.setState({
          tracks: data.tracks.items
        })
      })
  }
  updateSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  }

  getNowPlaying = () => {
    spotifyAPI.getMyCurrentPlaybackState()
      .then((response) => {
        console.log("Now playing response item", response.item)
        if(response) {
          this.setState({
            nowPlaying: {
                isPlaying: response.is_playing,
                progress: response.progress_ms,
                duration: response.item.duration_ms,
                name: response.item.name,
                artist: response.item.album.artists[0].name,
                album: response.item.album.name,
                image: response.item.album.images[0].url
              }
          });
        } else {
          console.log("no track currently playing")
          this.setState({nowPlaying: {
            name: "no song currently playing"
          }})
        }
      })
  }

  render() {
    console.log("nowPlaying state progress", this.state.nowPlaying.progress)
    console.log("nowPlaying state object", this.state.nowPlaying)
    console.log("deviceId", this.state.deviceId)

    // const progressBarStyles = {width: (this.state.progressBarValue) + '%'}
    // console.log(progressBarStyles)
    return (
      <div className='App'>

        <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
        </button>

        {this.state.loggedIn ?
          (<div>
            <div>
              <strong>Now Playing</strong> <br />
            </div>
            <div>
              <img src={ this.state.nowPlaying.image } style={ {width: 200} } alt={this.state.nowPlaying.album}/>
              <p>
                { this.state.nowPlaying.name }
                <br />
                {this.state.nowPlaying.artist}
                <br />
                {this.state.nowPlaying.album}
                <br />
              </p>
            </div>

            <div className="music-player">
              <MusicPlayer params={this.getHashParams()} getNowPlaying={this.getNowPlaying}/>
            </div>
          </div>)
          :
          (<div>Please log in</div>)
        }
      </div>
    )
  }
}



