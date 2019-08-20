import React, { Component } from 'react'
import ApplicationViews from './ApplicationViews'
import Navbar from "./nav/Navbar"
// import 'mapbox-gl/dist/mapbox-gl.css'
import './Jukebox.css'
import Login from './authentication/Login'


class Jukebox extends Component {

  state = {
    authenticated: sessionStorage.getItem("spotify_user_id"),
    currentUser: ""
  }

  setAuthState = () => {
    if( sessionStorage.getItem("spotify_user_id")) {
      this.setState({authenticated: true})
    } else {
      this.setState({authenticated: false})
    }
  }

//   render() {
//     return (
//       <React.Fragment >
//         {/* <SideMenu /> */}
//         {/* <PlayStatus/> */}
//         {/* <Navbar /> */}
//         <ApplicationViews />
//       </React.Fragment>
//     );
//   }
// }

  render() {
    if(this.state.authenticated) {
      return(
        <React.Fragment>
          <Navbar {...this.props} />
          <ApplicationViews />
        </React.Fragment>
      )
    } else {
      return (
        // <Redirect to="../login" />
      <React.Fragment>
        <ApplicationViews />
      </React.Fragment>
      )
    }
  }
}

export default Jukebox;
