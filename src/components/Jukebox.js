import React, { Component } from 'react'
import ApplicationViews from './ApplicationViews'
import "spotify-web-api-js"
import './Jukebox.css'

class Jukebox extends Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Jukebox;
