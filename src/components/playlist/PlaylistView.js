import React, { Component } from 'react'
import Spotify from "spotify-web-api-js"
import SongCard from "./SongCard"
import { Message, Table, Button, Modal, Header, Icon } from 'semantic-ui-react'

const spotifyAPI = new Spotify();
const currentUserId = sessionStorage.getItem("spotify_user_id")

export default class PlaylistView extends Component {

    state = {
        // addSong: "",
        // playlist: [],
        isPlaying: false,
        currentSongUri: "",
        currentSongId: "",
        open: false,
        hidden: true
    }

    handleOpen = () => this.setState({ open: true })
    handleClose = () => this.setState({ open: false })

    showButton = event => {
        if (this.props.currentPlaylist.spotifyId === currentUserId) {
            this.setState({
                hidden: !this.state.hiddenBtn
            })
        }
    }

    createNewPlaylist = () => {
        const spotifyId = sessionStorage.getItem("spotify_user_id")
        spotifyAPI.createPlaylist(spotifyId)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // this is when to set location
        })
    }

    getCurrentPlayback = () => {
        spotifyAPI.getMyCurrentPlaybackState()
        .then(data => {
                this.setState({
                    isPlaying: true,
                    currentSongUri: data.item.uri,
                    currentSongId: data.item.id
                })

            // console.log("got currently playing", data)
        })
    }

    deletePlaylist = () => {
        this.props.deleteFromAPI("playlists", this.props.currentPlaylist.id)
        .then(this.props.history.push("/"))
    }


    // playSong = (trackURI) => {
    //     // spotifyAPI.play(this.state.deviceId)
    //     const deviceId = "81d72cef4cbedfc3151083eadfee7a503c14857a"
    //     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    //       method: 'PUT',
    //       body: JSON.stringify({ uris: [trackURI] }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${this.props.token}`
    //       },
    //     });
    //     this.setState({isPlaying: true})
    //     this.playNext()
    // }

    // addToPlaylist = (event) => {
    //     event.preventDefault()
    //     let playlist = this.state.playlist
    //     let addSong = this.state.addSong
    //     playlist.push({name:addSong})
    //     this.setState({
    //         trackURI: track.uri
    //     })
    // }

    componentDidMount = () => {
        // this.createNewPlaylist()
        this.showButton()

    }

    render() {
        // console.log(this.props)
        // this.getCurrentPlayback()
        // console.log(this.state.currentSongUri)
        return (

        <React.Fragment>
            {this.props.currentPlaylist.spotifyId === currentUserId ?
            <Modal
                trigger={<Button onClick={this.handleOpen} size="tiny" style={{float: 'right', marginBottom: '30px', borderRadius: 20}} negative>End session</Button>}
                open={this.state.open}
                onClose={this.handleClose}
                basic
                size='tiny'

            >
                <Header icon='exclamation circle' content='End Your Session' />
                <Modal.Content>
                <p>
                    Are you sure you want to end this session?  Your playlist will not be saved.
                </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' onClick={this.handleClose} inverted >
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' onClick={() => {this.deletePlaylist(); this.handleClose()}} inverted>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            : "" }
            <Header >
                {
                    this.props.currentPlaylist ?
                <div key={this.props.currentPlaylist.id} fluid style={{marginRight: '100px'}}>
                    <Header style={{color: 'white'}}>{this.props.currentPlaylist.title}</Header>
                    <p style={{color: 'grey', fontSize: '14px'}}>Access code: {this.props.currentPlaylist.access_code}</p>
                </div>
                :
                <Header></Header>
                }
            </Header>
            <Table basic='very' selectable singleLine inverted style={{marginTop: '40px'}}>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell hidden = {(this.state.hidden)}></Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Artist</Table.HeaderCell>
                    <Table.HeaderCell>Album</Table.HeaderCell>
                    <Table.HeaderCell>Duration</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                {
                    this.props.songs.filter(song => song.playlistId === this.props.currentPlaylist.id)
                    .map(song =>
                        <SongCard key={song.id} {...this.props}
                            playSong={this.props.playSong}
                            isPlaying={this.state.isPlaying}
                            currentSongUri={this.state.currentSongUri}
                            currentSongId={this.state.currentSongId}
                            getCurrentPlayback={this.getCurrentPlayback}
                            song={song}
                        />
                    )
                }
                </Table.Body>
            </Table>

        </React.Fragment>
        )
    }
}
