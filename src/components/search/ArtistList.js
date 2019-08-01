import React, {Component} from 'react'
import { Icon, Button } from "semantic-ui-react"

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
                    <Button onClick={this.viewArtist}>
                        <Icon  size="small" name="plus" />
                    </Button>
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
