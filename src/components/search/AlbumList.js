import React, {Component} from 'react'
import { Icon, Button } from "semantic-ui-react"

// const spotifyAPI = new Spotify();

export default class AlbumList extends Component {

 viewAlbum = () => {

 }

    render() {
        return (
            <div className="album-results">
            {
            this.props.albums.map( (album, index) =>
                <div key={index}>
                    <Button onClick={this.viewAlbum}>
                        <Icon  size="small" name="plus" />
                    </Button>
                {album.name}
                {/* by {track.artists[0].name} */}
                {/* <img src={track.album.images[0].url} style={{width: 100}} alt="" /> */}
                </div>
                )
            }
            </div>
        )
    }
}
