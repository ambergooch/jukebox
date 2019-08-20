import React, { Component } from "react"
import { Dropdown, Image, Table, Icon, TableCell } from 'semantic-ui-react'
import "./SongCard.css"
import Spotify from "spotify-web-api-js";
import APIManager from "../modules/APIManager";

const spotifyAPI = new Spotify()
const currentUserId = sessionStorage.getItem("spotify_user_id")

export default class SongCard extends Component {

    state = {
        // userId: this.props.song.userId,
        // playlistId: this.props.song.playlistId,
        // songUri: this.props.song.song_uri,
        // songId: this.props.song.song_id,
        currentUser: [],
        hidden: true,
        hover: false,
        song: "",
        artist: "",
        album: "",
        duration: null,
        counter: 1,

        id: "",
        spotifyId: "",
        playlistId: "",
        song_uri: "",
        song_id: "",
        upvotes: "",
        downvotes: ""
    }

    toggleHover = () => {
            this.setState({hover: !this.state.hover})
        }

    handleUpvoteClick = () => {
        this.setState({
            upvotes: this.state.upvotes + 1
        })
        // this.editSongVotes()
    }

    handleDownvoteClick = () => {
        this.setState({
            downvotes: this.state.downvotes + 1
        })
        // this.editSongVotes()
    }

    showButtons = event => {
        if (this.props.currentPlaylist.spotifyId === currentUserId) {
            this.setState({
                hidden: !this.state.hidden
            })
        }
    }

    editSongVotes = () => {
        this.props.sortQueue()
        // this.setState({
        //     upvotes: this.state.counter
        // });

        const editedSong = {
            id: this.state.id,
            spotifyId: this.state.spotifyId,
            playlistId: this.state.playlistId,
            song_uri: this.state.song_uri,
            song_id: this.state.song_id
        }
        console.log(editedSong)
        this.props.updateAPI("songsToPlaylist", editedSong)
        .then(() => this.props.history.push("/playlist"))
    }

    handleButtonClick = () => {
        this.props.playSong(this.props.song.song_uri)
        // this.setState({
        //     isPlaying: true
        // })
        if (this.props.isPlaying === false) {
            this.props.getCurrentPlayback()
        }
    }

    getMetadata = (songID) => {
        spotifyAPI.getTrack(songID)
        .then(song => {
            this.setState({
              song: song.name,
              artist: song.artists[0].name,
              album: song.album.name,
              duration: song.duration_ms
            });
          });
    }

    milisToMinutesAndSeconds = (mil) => {
        const minutes = Math.floor(mil / 60000);
        const seconds = ((mil % 60000) / 1000).toFixed(0);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    componentDidMount () {
        this.showButtons()
        this.getMetadata(this.props.song.song_id)
        fetch(`http://localhost:5002/users?spotifyId=${currentUserId}`)
        .then(e => e.json())
        .then(user => {
            this.setState({
                currentUser: user[0]
            })
        })

        this.setState({
            id: this.props.song.id,
            spotifyId: this.props.song.spotifyId,
            playlistId: this.props.song.playlistId,
            song_uri: this.props.song.song_uri,
            song_id: this.props.song.song_id
        })
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment key={this.props.song.id}>
                <Table.Row>
                    <Table.Cell hidden = {(this.state.hidden)}>
                    <button className="song-card-button" onClick={this.handleButtonClick}  onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                        {this.props.isPlaying && this.props.song.song_uri === this.props.currentSongUri ? <Icon name="pause circle outline" color="grey" size="large" ></Icon> : <Icon name="play circle outline" color="grey" size="large" ></Icon>}
                    </button>
                    </Table.Cell>
                    <Table.Cell> {this.state.song}</Table.Cell>
                    <Table.Cell>{this.state.artist}</Table.Cell>
                    <Table.Cell>{this.state.album}</Table.Cell>
                    <Table.Cell>{this.milisToMinutesAndSeconds(this.state.duration)}</Table.Cell>
                    {/* <TableCell>
                        <button className="vote-button" onClick={() => {this.handleUpvoteClick(); this.editSongVotes()}}>
                            <Icon name='thumbs up outline' color='grey'></Icon>
                        </button>
                        {this.state.upvotes - this.state.downvotes}
                        <button className='vote-button' onClick={() => {this.handleDownvoteClick(); this.editSongVotes()}}>
                            <Icon name='thumbs down outline' color='grey'></Icon>
                        </button>
                    </TableCell> */}
                    <Table.Cell>
                    {
                        this.props.users
                            .filter(user => user.spotifyId === this.props.song.spotifyId)
                            .map(user =>
                                <React.Fragment key={user.spotifyId}>
                                    <Image src={user.image} style={{ marginRight: '.5em', borderRadius: 100, width: 24 }} />
                                </React.Fragment>
                            )
                    }

                        {/* <React.Fragment key={this.state.currentUser.spotifyId}>
                            <Image src={this.props.user.image} style={{ marginRight: '.5em', borderRadius: 100, width: 24 }} />
                        </React.Fragment> */}

                    </Table.Cell>
                    <Table.Cell >
                        {this.props.song.spotifyId === currentUserId || this.props.currentPlaylist.spotifyId === currentUserId ?
                            <Dropdown direction='left' className="inverted" style={{border: 'none'}}>
                                <Dropdown.Menu>
                                    {/* <Button onClick={this.handleEditButton} icon="edit" size="mini"></Button> */}
                                    <Dropdown.Item className="delete-song" onClick={() => this.props.deleteFromAPI("songsToPlaylist", this.props.song.id)}
                                            size="mini">Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> : ""}
                    </Table.Cell>
                </Table.Row>

                    {/* <Comment.Text hidden = {(this.state.hidden)? "" : "hidden"}>{this.props.message.message}</Comment.Text> */}
                    {/* VVVV THIS IS TEMPORARY. DON'T FORGET TO CHANGE THIS FROM SONG.USERID BACK TO PLAYLIST.USERID */}

            </React.Fragment>
        )
    }
}