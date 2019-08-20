import React, {Component} from 'react'
import { Icon } from "semantic-ui-react"
import "./SongSearch.css"

// const spotifyAPI = new Spotify();

export default class ArtistList extends Component {

    viewArtist = () => {

    }

    render() {
        return (
            <div className="artist-results">

            {
            this.props.artists.map( (artist, index) =>
                <div key={index}>
                     <button className='add' onClick={this.viewArtist}>
                        <Icon color="grey" size="large" name="plus circle" />
                    </button>
                {artist.name}
                {/* by {track.artists[0].name} */}
                {/* <img src={track.album.images[0].url} style={{width: 100}} alt="" /> */}
                </div>
                )
            }
            </div>
        )
    }
}
