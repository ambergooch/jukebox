import React, {Component} from 'react'
// import Spotify from "spotify-web-api-js"
// import { Link } from "react-router-dom"
// import { Menu, Segment, Tab } from 'semantic-ui-react'


// const spotifyAPI = new Spotify();



export default class SearchSong extends Component {

    // searchTracks = (searchTerm) => {
    //     spotifyAPI.searchTracks(searchTerm)
    //     .then((data) => {
    //         console.log("Search for 'tracks' results", data.tracks.items)
    //         this.setState({
    //         tracks: data.tracks.items
    //         })
    //     })
    // }
    render() {
        return (
            <div className="song-results">
            {
            this.props.tracks.map( (track, index) =>
                <div key={index}>
                {track.name}
                {/* by {track.artists[0].name} */}
                {/* <img src={track.album.images[0].url} style={{width: 100}} alt="" /> */}
                </div>
                )
            }
            </div>
        )
    }
}

