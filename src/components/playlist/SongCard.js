import React, { Component } from "react"
import { Button, Comment, Input, Dropdown, Image, Table, Icon } from 'semantic-ui-react'
import "./SongCard.css"
import Spotify from "spotify-web-api-js";

const spotifyAPI = new Spotify()
const currentUserId = sessionStorage.getItem("spotify_user_id")

export default class SongCard extends Component {

    state = {
        // userId: this.props.song.userId,
        // playlistId: this.props.song.playlistId,
        // songUri: this.props.song.song_uri,
        // songId: this.props.song.song_id,
        hidden: true,
        song: "",
        artist: "",
        album: "",
        duration: null,
        hover: false
    }

    toggleHover = () => {
            this.setState({hover: !this.state.hover})
            console.log("mouse")
        }
    // showButtons = event => {
    //     let currentUserId = parseInt(sessionStorage.getItem("id"))
    //     if (currentUserId === this.props.message.userId) {
    //         this.setState( {hiddenBtn: !this.state.hiddenBtn} )
    //     }
    // }

    // handleEditButton = event => {
    //     console.log("edit clicked")
    //     this.setState( {hidden: !this.state.hidden} )
    //     this.setState( {hiddenBtn: !this.state.hiddenBtn} )
    // }

    // editMessage = event => {
    //     event.preventDefault()
    //     const editedMessage = {
    //         id: this.props.message.id,
    //         userId: parseInt(this.state.userId),
    //         message: this.state.message,
    //     }
    //     console.log(editedMessage)
    //     this.handleEditButton()
    //     this.props.updateAPI(editedMessage, "messages")
    //     .then(() => this.props.history.push("/"))
    // }

    handleButtonClick = () => {
        this.props.playSong(this.props.song.song_uri)
        if (this.props.isPlaying) {

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
        this.getMetadata(this.props.song.song_id)
    }

    render() {
        // this.props.getCurrentPlayback()

//    if (this.state.hover) {
//      const linkStyle = {color: '#ed1212',cursor: 'pointer'}
//    } else {
//      const linkStyle = {color: '#000'}
//    }
        // console.log(this.state.songId)
        // console.log(this.props.song.song_uri)
        // console.log(this.props.currentSongUri)
        return (
            <React.Fragment className="song-card" key={this.props.song.id}>

                {/* <div className="form-group" hidden = {(this.state.hidden)? "hidden" : ""}>
                    <Input fluid type="text" onChange={this.handleFieldChange} id="message" value = {this.state.message} />
                    <Button type="submit" onClick={this.editMessage} className="btn btn-primary" size="tiny">Save</Button>
                </div> */}
                {/* <div className="song-div"> */}

                    <Table.Row>
                        <Table.Cell>
                        <button className="song-card-button" onClick={this.handleButtonClick}  onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                            {this.props.isPlaying && this.props.song.song_uri === this.props.currentSongUri ? <Icon name="pause circle outline" size="large" ></Icon> : <Icon name="play circle outline" size="large" ></Icon>}
                        </button>
                        </Table.Cell>
                        <Table.Cell> {this.state.song}</Table.Cell>
                        <Table.Cell>{this.state.artist}</Table.Cell>
                        <Table.Cell>{this.state.album}</Table.Cell>
                        <Table.Cell>{this.milisToMinutesAndSeconds(this.state.duration)}</Table.Cell>
                        <Table.Cell>
                            {
                            this.props.users
                                .filter(user => user.id === this.props.song.userId)
                                .map(user =>
                                    <React.Fragment key={user.id}>
                                        <Image src={user.image} style={{ marginRight: '.5em', borderRadius: 100, width: 24 }} />
                                    </React.Fragment>
                                )
                            }
                        </Table.Cell>
                        <Table.Cell>
                            {this.props.song.userId === currentUserId ?
                                <Dropdown>
                                    <Dropdown.Menu>
                                        {/* <Button onClick={this.handleEditButton} icon="edit" size="mini"></Button> */}
                                        <Button onClick={() => this.props.deleteFromAPI("songsToPlaylist", this.props.song.id)}
                                            icon="trash" size="mini"></Button>
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