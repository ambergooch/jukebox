import React, { Component } from 'react'
import SideMenu from "./menu/SideMenu"
// import PlayStatus from "./player/PlayStatus"
import ApplicationViews from './ApplicationViews'
// import Home from './home/Home'
import Navbar from "./nav/Navbar"
import "spotify-web-api-js"
import './Jukebox.css'



class Jukebox extends Component {
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
