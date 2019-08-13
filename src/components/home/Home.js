import React, { Component } from "react";
import { Container } from 'semantic-ui-react'
// import Spotify from "spotify-web-api-js"
// import TaskList from "../task/TaskList"
// import "./Home.css"
import MusicPlayer from "../player/MusicPlayer";
import PlayStatus from "../player/PlayStatus";
import SearchResults from "../search/SearchResults"
import Navbar from "../nav/Navbar"
import SideMenu from "../menu/SideMenu"
import PlaylistView from '../playlist/PlaylistView'
import Browse from "../search/Browse"
import SessionMap from '../geolocation/SessionMap'
import "./Home.css"


export default class Home extends Component{




  render(){

        return(
          <React.Fragment>
            <Navbar users={this.props.users}/>
            {this.props.currentUser === this.props.currentPlaylist.spotifyId ?
            <Container className="player-bar" fluid>
              <MusicPlayer {...this.props} token={this.props.token} queue={this.props.queue}/>
            </Container>
            : ""}
             <div className="side-bar" style={{boxShadow: "6px 6px 5px black"}}>
               <SideMenu {...this.props} />
                <PlayStatus {...this.props} token={this.props.token}
                  queue={this.props.queue}
                  playSong={this.props.playSong}
                  playNext={this.playNext}
                  nowPlaying={this.props.nowPlaying} />

             </div>
             <div className="main-window" style={{backgroundColor: 'rgb(2, 2, 2)'}}>

            {window.location.pathname === "/" ?
                <Container className="home">
                  <Browse/>
                </Container>

            : "" }
            {window.location.pathname === "/search" ?
                <Container className="search">
                  <SearchResults {...this.props} addToAPI={this.props.addToAPI}/>
                </Container>

            : "" }
            {window.location.pathname === "/map" ?
                <Container className="map">
                  <SessionMap {...this.props} />
                </Container>

            : "" }
            {window.location.pathname === "/playlist" ?
                <Container>
                  <PlaylistView {...this.props}
                    users={this.props.users}
                    currentUser={this.props.currentUser}
                    playlists={this.props.playlists}
                    songs={this.props.songs}
                    deleteFromAPI={this.props.deleteFromAPI}
                    deleteSongsFromAPI={this.props.deleteSongsFromAPI}
                    playSong={this.props.playSong}
                    playNext={this.playNext}
                    currentPlaylistId={this.props.currentPlaylistId} />
                </Container>

            : ""}

</div>

             {/* <Grid.Row> */}

         {/* </Grid.Row> */}
         </React.Fragment>
        )
  }
}
