import React, { Component } from 'react'
import Spotify from "spotify-web-api-js"
import SongCard from "./SongCard"
import { Table, Button, Modal, Header, Icon, Popup } from 'semantic-ui-react'
import EdiText from 'react-editext'
import './SongCard.css'

const spotifyAPI = new Spotify();
const currentUserId = sessionStorage.getItem("spotify_user_id")

export default class PlaylistView extends Component {

    state = {
        // addSong: "",
        // playlist: [],
        isPlaying: false,
        currentSongUri: "",
        currentSongId: "",
        queueURIs: [],
        addOpen: false,
        open: false,
        id: "",
        spotifyId: "",
        title: "",
        description: "",
        access_code: "",
        latitude: "",
        longitude: ""
    }


    handleOpen = () => this.setState({ open: true })
    handleClose = () => this.setState({ open: false })
    handleAddOpen = () => this.setState({ addOpen: true })
    handleAddClose = () => this.setState({ addOpen: false })

    handleAddClick = (event) => {
        this.handleAddOpen()
        setTimeout(() => this.handleAddClose(), 2000)
    }

    getQueueURIs = () => {
        this.props.queue.map(track => {
            this.state.queueURIs.push(track.song_uri)
        })
    }

    createNewPlaylist = () => {
        const spotifyId = sessionStorage.getItem("spotify_user_id")
        spotifyAPI.createPlaylist(spotifyId, {name: this.props.currentPlaylist.title})
        // .then(response => response.json())
        .then(data => {
            console.log("playlist id", data.id)
            spotifyAPI.addTracksToPlaylist(data.id, this.state.queueURIs)
            .then( data => {
                console.log("add tracks data", data)
            })
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

    editPlaylistTitle = event => {
        console.log(event)

        this.setState({
            title: event
        });

        const editedPlaylist = {
            id: this.state.id,
            spotifyId: this.state.spotifyId,
            title: event,
            description: this.state.description,
            access_code: this.state.access_code,
            latitude: this.state.latitude,
            longitude: this.state.longitude

        }
        console.log(editedPlaylist)
        this.props.updateAPI("playlists", editedPlaylist)
        .then(() => this.props.history.push("/playlist"))
    }


    componentDidMount = () => {
        this.getQueueURIs()
        this.setState({
            id: this.props.currentPlaylist.id,
            spotifyId: this.props.currentPlaylist.spotifyId,
            title: this.props.currentPlaylist.title,
            description: this.props.currentPlaylist.description,
            access_code: this.props.currentPlaylist.access_code,
            latitude: this.props.currentPlaylist.latitude,
            longitude: this.props.currentPlaylist.longitude
        })

    }
    componentDidUpdate = (prevProps) => {
        if(this.props.currentPlaylist !== prevProps.currentPlaylist) {
            this.setState({
                id: this.props.currentPlaylist.id,
                spotifyId: this.props.currentPlaylist.spotifyId,
                title: this.props.currentPlaylist.title,
                description: this.props.currentPlaylist.description,
                access_code: this.props.currentPlaylist.access_code,
                latitude: this.props.currentPlaylist.latitude,
                longitude: this.props.currentPlaylist.longitude
            })

        }
    }


    render() {
        console.log(this.props)
        console.log(this.state.queueURIs)
        const {open, addOpen} = this.state
        return (
        <React.Fragment>
            {/* <Button onClick={this.handleOpen} size="tiny" style={{float: 'right', marginBottom: '30px', borderRadius: 20}} positive>Save to Spotify</Button> */}
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
            <Button
                onClick={() => {this.createNewPlaylist(); this.handleAddClick()}}
                size="tiny" style={{float: 'right', marginRight: '10px', marginBottom: '30px', borderRadius: 20}}
                positive>
                    Save to Spotify
            </Button>
            <Modal className='inverted' size='mini' open={addOpen} onClose={this.close}>
                <Modal.Header>Playlist Saved to Your Spotify Account!</Modal.Header>
                <Modal.Content>
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                </Modal.Content>
            </Modal>
            <Header >
                {this.props.currentPlaylist.spotifyId === currentUserId ?
                    <div key={this.props.currentPlaylist.id} style={{marginRight: '100px'}}>

                        <Popup content={this.props.currentPlaylist.description} trigger={
                        <EdiText
                            type='text'
                            id="title"
                            value={this.state.title}
                            // onChange= {this.handleFieldChange}
                            onSave={this.editPlaylistTitle}
                            editOnViewClick={true}
                            editButtonClassName="edit-button"
                            editButtonContent={<Icon name='pencil' color='grey' style={{marginBottom: '20px'}}></Icon>}
                            viewProps={{
                                className: 'header',
                                style: {
                                    color: 'white',
                                    fontSize: '24px',
                                    marginBottom: '20px'
                                }
                            }}
                            inputProps={{
                                // onChange: this.handleFieldChange,
                                id: "title",
                                value: this.state.title,
                                style: {
                                    backgroundColor: 'black',
                                    color: '#E6ECF1',
                                    fontWeight: 500,
                                    width: 250
                                }
                            }}/>
                        }/>
                    </div>
                    :
                    <Header style= {{color: 'white', fontSize: '24px', marginBottom: '20px'}}>
                        {this.props.currentPlaylist.title}
                    </Header>
                }
                 <Popup content={this.props.currentPlaylist.description}
                            inverted
                            position='bottom left'
                            trigger={
                                <p style={{color: 'grey', fontSize: '14px'}}>Access code: {this.props.currentPlaylist.access_code}</p>
                } />
            </Header>
            <Table basic='very' selectable singleLine inverted style={{marginTop: '40px'}}>
                <Table.Header>
                <Table.Row>
                {this.props.currentPlaylist.spotifyId === currentUserId ?
                    <Table.HeaderCell></Table.HeaderCell>
                : ""}
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Artist</Table.HeaderCell>
                    <Table.HeaderCell>Album</Table.HeaderCell>
                    <Table.HeaderCell>Duration</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
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
