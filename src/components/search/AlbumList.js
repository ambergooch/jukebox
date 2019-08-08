import React, {Component} from 'react'
import { Icon, Button } from "semantic-ui-react"
import "./SongSearch.css"

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
                     <button className='add' onClick={this.viewAlbum}>
                        <Icon color="grey" size="large" name="plus circle" />
                    </button>
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
