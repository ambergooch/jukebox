import React, { Component } from 'react'
import SideMenu from "./menu/SideMenu"
// import PlayStatus from "./player/PlayStatus"
import ApplicationViews from './ApplicationViews'
// import Home from './home/Home'
import Navbar from "./nav/Navbar"
// import 'mapbox-gl/dist/mapbox-gl.css'
import "spotify-web-api-js"
import './Jukebox.css'

class Jukebox extends Component {

  state = {
    authenticated: sessionStorage.getItem("spotify_user_id")
  }

  setAuthState = () => {
    if( sessionStorage.getItem("spotify_user_id")) {
      this.setState({authenticated: true})
    } else {
      this.setState({authenticated: false})
    }
  }

  render() {
    return (
      <React.Fragment >
        {/* <SideMenu /> */}
        {/* <PlayStatus/> */}
        {/* <Navbar /> */}
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Jukebox;
