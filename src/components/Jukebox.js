import React, { Component } from 'react'
import SideMenu from "./menu/SideMenu"
import ApplicationViews from './ApplicationViews'
// import Home from './home/Home'
import "spotify-web-api-js"
import './Jukebox.css'



class Jukebox extends Component {
  render() {
    return (
      <React.Fragment>
        <SideMenu />
        {/* <ApplicationViews /> */}
      </React.Fragment>
    );
  }
}

export default Jukebox;
