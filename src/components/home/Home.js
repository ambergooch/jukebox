import React, { Component } from "react";
import { Container } from 'semantic-ui-react'
// import Spotify from "spotify-web-api-js"
// import TaskList from "../task/TaskList"
// import "./Home.css"
// import MusicPlayer from "../player/MusicPlayer";
import PlayStatus from "../player/PlayStatus";
import SearchResults from "../search/SearchResults"
import Navbar from "../nav/Navbar"
import "./Home.css"
import SideMenu from "../menu/SideMenu"
import PlaylistView from '../playlist/PlaylistView'

export default class Home extends Component{




  render(){
        return(
          <React.Fragment>
            <Navbar users={this.props.users}/>
             <div className="side-bar" style={{boxShadow: "6px 6px 10px grey"}}>
               <SideMenu />
                <PlayStatus {...this.props} token={this.props.token}
                  queue={this.props.queue}
                  playSong={this.props.playSong}/>
                 {/* <MusicPlayer {...this.props} token={this.props.token} getNowPlaying={this.getNowPlaying} /> */}
             </div>
            <div className="main-window">
            {/* <Grid columns={4} relaxed='very' stackable> */}
                <Container className="search">
                  <SearchResults {...this.props} addToAPI={this.props.addToAPI}/>
                </Container>
                <Container>
                  <PlaylistView {...this.props}
                    users={this.props.users}
                    currentUser={this.props.currentUser}
                    playlists={this.props.playlists}
                    songs={this.props.songs}
                    deleteFromAPI={this.props.deleteFromAPI}
                    deleteSongsFromAPI={this.props.deleteSongsFromAPI}
                    playSong={this.props.playSong} />
                </Container>
            </div>

             {/* <Grid.Row> */}

         {/* </Grid.Row> */}
         </React.Fragment>
        )
  }
}
