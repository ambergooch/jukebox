import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import { withRouter } from 'react-router'
import appKey from "./key"
import Spotify from "spotify-web-api-js"
import Login from './authentication/Login'
import Home from './home/Home'
import SearchResults from './search/SearchResults'
import SearchSongs from './search/SearchSongs'
import SearchArtists from './search/SearchArtists'
import SearchAlbums from './search/SearchAlbums'
import APIManager from './modules/APIManager'
import Callback from '../callback/Callback'

const spotifyAPI = new Spotify();

const tokenFromMainWindow = sessionStorage.getItem("access_token")
spotifyAPI.setAccessToken(tokenFromMainWindow)

class ApplicationViews extends Component {
    state = {
        users: [],
        playlists: [],
        playlistSong: [],
        locations: [],
        collaborators: [],
        token: spotifyAPI.getAccessToken(),
        currentUser: ""
    }

    loginUser = () => {
        if(this.state.currentUser !== null) {
          return(
            <a className="login-a" href={"http://localhost:3000/login"}>
                Login in button
            </a>
          )
        }
        return null
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
        console.log("new token", this.state.token)

    }

    checkForToken() {
        if (sessionStorage.getItem("access_token") !== null) {
            window.close()
            const token = sessionStorage.getItem("access_token")
            console.log("current token", token)
        }
    }
    checkTokenInt = setInterval(() => {
        console.log("checking for token")
        this.checkForToken();
    }, 100000 )


      getTokenInt = setInterval(() => {
        const token = this.state.token;
        sessionStorage.setItem('access_token', token);
        console.log(token)

        this.getToken();
      }, 900000);

    getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    addToAPI = (resource, object) => {
        APIManager.post(resource, object)
        .then(() => APIManager.getAll(resource))
        .then(item =>{
            this.setState({
            [resource]: item
            })
        })
    }
    componentDidMount () {
        this.loginUser()
        this.setState({
            token: this.state.token,
            authURL: this.authURL

        })
    }

    isAuthenticated = () => sessionStorage.getItem("access_token") !== undefined

    render() {
        // console.log(sessionStorage.getItem("access_token"))
        console.log(this.state.token)
        return (
            <React.Fragment>
                <Route exact path="/callback" render={props => {
                    return <Callback {...props}/>
                }} />
                {/* <Route path="/callback/:accessToken/:refreshToken" render={props => {
                    return <Login/>
                }} /> */}
                <Route path="/login" render={props => {
                    return <Login  {...props} addToAPI={this.addToAPI}   getToken={this.getToken}/>
                 }} />
                <Route exact path="/" render={(props) => {
                    if(this.isAuthenticated()) {
                        return <Home {...props} token={this.state.token} />
                    } else {
                        return <Redirect to="./login" />
                    }
                }} />
                <Route exact path="/search" render={(props) => {
                    return <SearchResults />
                }} />
                <Route path="/search/songs" render={(props) => {
                    return <SearchSongs />
                }} />
                <Route path="/search/artists" render={(props) => {
                    return <SearchArtists />
                }} />
                <Route path="/search/albums" render={(props) => {
                    return <SearchAlbums />
                }} />




                {/* <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props}
                        animals={this.state.animals}
                        owners={this.state.owners}
                        deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                       addAnimal={this.addAnimal}
                       employees={this.state.employees} />
                }} />   */}


            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)
