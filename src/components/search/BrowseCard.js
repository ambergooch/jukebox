import React, {Component} from 'react'
import { Icon, Grid, Image, Dimmer, Modal } from "semantic-ui-react"
import "./SongSearch.css"

// const spotifyAPI = new Spotify();

export default class ArtistList extends Component {

    state = {
        active: "",
        open: false
    }

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    handlePlayButtonClick = () => {
        this.props.playSong(this.props.track.uri)
        // this.setState({
        //     isPlaying: true
        // })
        if (this.props.isPlaying === false) {
            this.props.getCurrentPlayback()
        }
    }

    handleAddButtonClick = (event) => {
        this.open()
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
        console.log(this.props)
        const { active, open } = this.state
        const { track } = this.props
        const content = (
            <div>
                <Icon size='huge' name='play circle outline' onClick={this.handlePlayButtonClick}/>
                <Icon.Group size='big' onClick={(event) => {this.handleAddButtonClick(event); this.addToQueue(track.uri, track.id, track.name, track.artists[0].name, track.album.images[0].url)}}>
                    <Icon size='big' name='circle outline' />
                    <Icon name='add' />
                </Icon.Group>
            </div>
          )
        return (
            <Grid.Column className="artist-results">


                <div key={this.props.index}>

                {/* <Image src={this.props.track.album.images[0].url} style={{width: 100}} alt="" /> */}

                {/* by {track.artists[0].name} */}


                <Dimmer.Dimmable
                    circular
                    as={Image}
                    dimmed={active}
                    dimmer={{ active, content }}
                    onMouseEnter={this.handleShow}
                    onMouseLeave={this.handleHide}
                    size='medium'

                    src={this.props.track.album.images[0].url}
                />
                <p style={{textAlign: 'center', marginTop: '20px'}}>
                    <strong>{this.props.track.name}</strong>
                    <p style={{color: 'grey', textAlign: 'center'}}>{this.props.track.artists[0].name}</p>
                </p>
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


            </Grid.Column>
        )
    }
}
