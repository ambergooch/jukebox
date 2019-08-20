import React, {Component} from 'react'
import { Icon, Modal } from "semantic-ui-react"
import "./SongSearch.css"


export default class SongSearch extends Component {

    state = {
        isPlaying: false,
        queue: [],
        songResult: {
            uri: null,
            name: null,
            artist: null,
            cover: null,
        },
        open: false
    }

    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    handleAddClick = (event) => {
        event.preventDefault()
        this.show()
        setTimeout(() => this.close(), 2000)
    }

    addToQueue = (trackURI, trackID) => {
        const song = {
            spotifyId: sessionStorage.getItem("spotify_user_id"),
            playlistId: this.props.currentPlaylistId,
            song_uri: trackURI,
            song_id: trackID
        }
        this.props.addToAPI("songsToPlaylist", song)
    }

    render() {
        const {open} = this.state
        return (
            <div className="song-results">
            {
            this.props.tracks.map( (track, index) =>
                <div key={index}>


                    <button className='add' onClick={(event) => {this.handleAddClick(event); this.addToQueue(track.uri, track.id, track.name, track.artists[0].name, track.album.images[0].url)}}>
                        <Icon color="grey" size="large" name="plus circle" />
                    </button>
                {track.name} by {track.artists[0].name}
                {/* <img src={track.album.images[0].url} style={{width: 100}} alt="" /> */}
                </div>
                )
            }
            <Modal className='inverted' size='mini' open={open} onClose={this.close}>
                <Modal.Header>Song Added!</Modal.Header>
                <Modal.Content>
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                </Modal.Content>
            </Modal>
            </div>
        )
    }
}



