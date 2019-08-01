import React, {Component} from 'react'
import { Icon, Button } from "semantic-ui-react"

// const spotifyAPI = new Spotify();

export default class SongList extends Component {

 addToPlaylist = () => {

 }

    render() {
        return (
            <div className="song-results">
            {
            this.props.tracks.map( (track, index) =>
                <div key={index}>
                    <button onClick={this.addToPlaylist}>
                        <Icon  size="tiny" name="plus" />
                    </button>
                {track.name} by {track.artists[0].name}
                {/* <img src={track.album.images[0].url} style={{width: 100}} alt="" /> */}
                </div>
                )
            }
            </div>
        )
    }
}

