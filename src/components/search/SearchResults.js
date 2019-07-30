import React, { Component } from 'react';
import Spotify from "spotify-web-api-js"

export default class SearchResults extends Component {

    state = {
        searchTerm: "",
        tracks: [],
        artists: [],
        albums: []
    }

    render() {
        return (
            <div className="search-container">
                <form onSubmit={() => { this.searchTracks(this.state.searchTerm);}}>
                    <input onChange={this.updateSearchTerm} type="text" placeholder="Search..." />
                    <button onClick={(event) => { event.preventDefault(); this.searchTracks(this.state.searchTerm);}}>
                    </button>
                </form>

                <div className="search-results">
                {
                this.state.tracks.map( (track, index) =>
                    <div key={track.id}>
                    {track.name} by {track.artists[0].name}
                    {/* <img src={track.album.images[0].url} style={{width: 100}} alt="" /> */}
                    </div>
                    )
                }
                </div>
            </div>
        )
    }
}
