import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import { withRouter } from 'react-router'
import appKey from "./key"
import Spotify from "spotify-web-api-js"
import Login from './authentication/Login'
import Callback from './callback/Callback'
import Home from './home/Home'
import SearchResults from './search/SearchResults'
// import SongList from './search/SongList'
// import ArtistList from './search/ArtistList'
// import AlbumList from './search/AlbumList'
import APIManager from './modules/APIManager'
import PlaylistView from './playlist/PlaylistView'

const spotifyAPI = new Spotify();
const loginURL = "http://localhost:3000/login"
const tokenFromMainWindow = sessionStorage.getItem("access_token")
spotifyAPI.setAccessToken(tokenFromMainWindow)

class ApplicationViews extends Component {
    state = {
        users: [],
        playlists: [],
        songsToPlaylist: [],
        locations: [],
        collaborators: [],
        token: "",
        currentUser: "",
        deviceId: "",
        currentPlaylistId: null,
        currentPlaylist: "",
        codeInput: null,
        nowPlaying: {
            name: "",
            artist: "",
            album: "",
            image: "",
            position: 0,
            duration: 0,
            song_id: ""
          },
        queue: []
    }



    componentDidMount () {
        // this.loginUser()
        this.getNowPlaying()
        this.setState({
            token: spotifyAPI.getAccessToken(),
            currentUser: sessionStorage.getItem("spotify_user_id"),
            deviceId: sessionStorage.getItem("device_id"),
            queue: []
        })

        const newState = {};
            APIManager.getAll("users")
            .then(users => (newState.users = users));
            APIManager.getAll("playlists")
            .then(playlists => (newState.playlists = playlists));
            APIManager.getAll("songsToPlaylist")
            .then(songsToPlaylist => (newState.songsToPlaylist = songsToPlaylist));
            APIManager.getAll("locations")
            .then(locations => (newState.locations = locations))
            APIManager.getAll("collaborators")
            .then(collaborators => (newState.collaborators = collaborators))
            .then(() => this.setState(newState));

    }


    addToAPI = (resource, object) => {
        return APIManager.post(resource, object)
        .then(() => APIManager.getAll(resource))
        .then(data =>{
            this.setState({
                [resource]: data
            })
        })
    }

    deleteFromAPI = (resource, id) => {
        return APIManager.delete(resource, id)
        .then(data => {
            this.setState({
                [resource]: data
            })

        })
    }

   updateAPI = (resource, object) => {
        return APIManager.put(resource, object)
        .then(() => APIManager.getAll(resource))
        .then(data => {
            this.setState({
                [resource]: data
            })
        })
    }

    saveUser() {
        if (this.state.currentUser ) {
          // if (sessionStorage.getItem("access_token") !== undefined) {

              spotifyAPI.getMe()
              .then(user => {
                let newUser =
                {
                  displayName: user.display_name,
                  email: user.email,
                  spotifyId: user.id,
                  image: user.images[0].url
                }
                this.addToAPI("users", newUser)
              })
          } else {
            window.location = `${loginURL}`;
          }
        // }
      }

    getSpotifyUserId = () => {
        spotifyAPI.getMe().then(user => {
          this.setState({currentUser: user.id})
          sessionStorage.setItem("spotify_user_id", user.id)
        })
        // THIS IS POSTING USER TO DATABASE MULTIPLE TIMES. RESOLVE TIMING ISSUE OR ADD CONDITIONAL TO FUNCTION
        // .then(() => this.saveUser())
      }

    getToken = () => {
        const authEndpoint = "http://accounts.spotify.com/authorize"
        const clientId = appKey.client_id
        const redirectURI = "http://localhost:3000/callback/"
        const scope = appKey.scope
        const authURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}&response_type=token`
        window.open(authURL,
            'Login with Spotify',
            'width=400,height=500'
        )
        this.setState({
            token: this.state.token,
            authURL: this.authURL

        })

    }

    // checkForToken() {
    //     if (sessionStorage.getItem("access_token") !== null) {
    //         window.close()
    //         const token = sessionStorage.getItem("access_token")
    //         console.log("current token", token)
    //         this.getSpotifyUserId()
    //     }
    // }
    // checkTokenInt = setInterval(() => {
    //     console.log("checking for token")
    //     this.checkForToken();
    // }, 100000 )


    getTokenInt = setInterval(() => {
        this.getToken();
        const token = this.state.token;
        sessionStorage.setItem('access_token', token);
        this.getSpotifyUserId()
    }, 3000000);

    getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    playSong = (trackURI) => {
        const deviceId = sessionStorage.getItem("device_id")
        // spotifyAPI.play(this.state.deviceId)
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [trackURI] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.token}`
          },
        });
        this.setState({
            isPlaying: true
        })
    }

    getNowPlaying = () => {
        return spotifyAPI.getMyCurrentPlaybackState()
          .then((response) => {
            if(response) {
              this.setState({
                nowPlaying: {
                    isPlaying: response.is_playing,
                    progress: response.progress_ms,
                    duration: response.item.duration_ms,
                    name: response.item.name,
                    artist: response.item.album.artists[0].name,
                    album: response.item.album.name,
                    image: response.item.album.images[0].url,
                    song_id: response.item.id

                  }

              });
              let currentId = response.item.id
              console.log("get now playing has fired")
              return currentId

            }
            // else {
            //   // console.log("no track currently playing")
            //   this.setState({nowPlaying: {
            //     name: "no song currently playing"
            //   }})
            // }
          })

      }

    // Copies songsToPlaylist array from database to new array
    populateQueue = () => {
        this.state.queue = []
        let songsToQueue = this.state.songsToPlaylist
            .filter(song => song.playlistId === this.state.currentPlaylistId)
        this.state.queue.push.apply(this.state.queue, songsToQueue)
    }

    setCurrentPlaylist = () => {
        let currentPlaylist = this.state.playlists
            .find(playlist => playlist.spotifyId === this.state.currentUser)
                this.setState({
                  currentPlaylist: currentPlaylist,
                  currentPlaylistId: currentPlaylist.id
                })

    }

    setCode = (value) => {
        console.log("set code")
        APIManager.getPlaylist(value)
        .then((currentPlaylist) => {
        this.setState({
            currentPlaylist: currentPlaylist[0],
            currentPlaylistId: currentPlaylist[0].id
        })
        })
        this.props.history.push("/playlist")
    }

    playNext = () => {
        if (this.state.queue.length > 0){

          let songId = this.getNowPlaying()
          Promise.all([songId]).then((res) => {

            let currentQueue = this.state.queue;
            for (let index = 0; index < currentQueue.length; index++) {
                console.log(res[0])
                if ( res[0] === currentQueue[index].song_id){
                    console.log("we are in the if logic of play next")
                    let newIndex = index + 1
                    console.log(newIndex)
                    this.playSong(this.state.queue[newIndex].song_uri)

                }

            }
   })

        //Changed index to 1 to play second song after clicking first play button. Using reduce is and option to add more control
        }
      }


    // setCurrentPlaylistByCode = (value) => {
    //     console.log(value)
    //     let currentPlaylist = this.state.playlists
    //         .find(playlist => playlist.access_code === value)
    //             this.setState({
    //               currentPlaylistId: currentPlaylist.id
    //             })
    //     console.log("current playlist set w code", currentPlaylist)
    // }

    isAuthenticated = () => sessionStorage.getItem("access_token") !== undefined

    render() {
        this.populateQueue()

        return (
            <React.Fragment>
                <Route exact path="/callback" render={props => {
                    return <Callback {...props} getUserId={this.getSpotifyUserId}/>
                }} />
                {/* <Route path="/callback/:accessToken/:refreshToken" render={props => {
                    return <Login/>
                }} /> */}
                <Route path="/login" render={props => {
                    return <Login  {...props} addToAPI={this.addToAPI}
                        getToken={this.getToken}
                        getUserId={this.getSpotifyUserId}/>
                 }} />
                <Route exact path="/" render={(props) => {
                    if(this.isAuthenticated()) {
                        return <Home {...props} token={this.state.token}
                            addToAPI={this.addToAPI}
                            deleteFromAPI={this.deleteFromAPI}
                            deleteSongsFromAPI={this.deleteSongsFromAPI}
                            updateAPI={this.updateAPI}
                            users={this.state.users}
                            playlists={this.state.playlists}
                            songs={this.state.songsToPlaylist}
                            playSong={this.playSong}
                            playNext={this.playNext}
                            queue={this.state.queue}
                            nowPlaying={this.state.nowPlaying}
                            getNowPlaying={this.getNowPlaying}
                            currentUser={this.state.currentUser}
                            currentPlaylist={this.state.currentPlaylist}
                            currentPlaylistId={this.state.currentPlaylistId}
                            setCurrentPlaylist={this.setCurrentPlaylist}
                            setCode={this.setCode} />
                    } else {
                        return <Redirect to="./login" />
                    }
                }} />
                <Route path="/search" render={(props) => {
                    return <Home {...props} token={this.state.token}
                    addToAPI={this.addToAPI}
                    deleteFromAPI={this.deleteFromAPI}
                    deleteSongsFromAPI={this.deleteSongsFromAPI}
                    updateAPI={this.updateAPI}
                    users={this.state.users}
                    playlists={this.state.playlists}
                    songs={this.state.songsToPlaylist}
                    playSong={this.playSong}
                    playNext={this.playNext}
                    queue={this.state.queue}
                    nowPlaying={this.state.nowPlaying}
                    getNowPlaying={this.getNowPlaying}
                    currentUser={this.state.currentUser}
                    currentPlaylist={this.state.currentPlaylist}
                    currentPlaylistId={this.state.currentPlaylistId}
                    setCurrentPlaylist={this.setCurrentPlaylist}
                    setCode={this.setCode} />
                    // <SearchResults {...props} addToAPI={this.addToAPI}/>
                }} />
                <Route exact path="/playlist" render={(props) => {
                    return <Home {...props} token={this.state.token}
                    addToAPI={this.addToAPI}
                    deleteFromAPI={this.deleteFromAPI}
                    deleteSongsFromAPI={this.deleteSongsFromAPI}
                    updateAPI={this.updateAPI}
                    users={this.state.users}
                    playlists={this.state.playlists}
                    songs={this.state.songsToPlaylist}
                    playSong={this.playSong}
                    playNext={this.playNext}
                    queue={this.state.queue}
                    nowPlaying={this.state.nowPlaying}
                    getNowPlaying={this.getNowPlaying}
                    currentUser={this.state.currentUser}
                    currentPlaylist={this.state.currentPlaylist}
                    currentPlaylistId={this.state.currentPlaylistId}
                    setCurrentPlaylist={this.setCurrentPlaylist}
                    setCode={this.setCode}  />
                }} />
                <Route exact path="/map" render={(props) => {
                    return <Home {...props} token={this.state.token}
                    addToAPI={this.addToAPI}
                    deleteFromAPI={this.deleteFromAPI}
                    deleteSongsFromAPI={this.deleteSongsFromAPI}
                    updateAPI={this.updateAPI}
                    users={this.state.users}
                    playlists={this.state.playlists}
                    songs={this.state.songsToPlaylist}
                    playSong={this.playSong}
                    playNext={this.playNext}
                    queue={this.state.queue}
                    nowPlaying={this.state.nowPlaying}
                    getNowPlaying={this.getNowPlaying}
                    currentUser={this.state.currentUser}
                    currentPlaylist={this.state.currentPlaylist}
                    currentPlaylistId={this.state.currentPlaylistId}
                    setCurrentPlaylist={this.setCurrentPlaylist}
                    setCode={this.setCode}  />
                }} />
            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)
