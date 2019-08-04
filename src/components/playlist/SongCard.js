import React, { Component } from "react"
import { Button, Comment, Input, Dropdown, Image, Table } from 'semantic-ui-react'
// import "./SongCard.css"
import Spotify from "spotify-web-api-js";

const spotifyAPI = new Spotify()
const currentUserId = sessionStorage.getItem("spotify_user_id")

export default class SongCard extends Component {

    state = {
        userId: this.props.song.userId,
        playlistId: this.props.song.playlistId,
        songUri: this.props.song.song_uri,
        songId: this.props.song.song_id,
        hidden: true,
        song: "",
        artist: "",
        album: "",
        duration: null
    }

    // showButtons = event => {
    //     let currentUserId = parseInt(sessionStorage.getItem("id"))
    //     if (currentUserId === this.props.message.userId) {
    //         this.setState( {hiddenBtn: !this.state.hiddenBtn} )
    //     }
    // }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    }

    handleEditButton = event => {
        console.log("edit clicked")
        this.setState( {hidden: !this.state.hidden} )
        this.setState( {hiddenBtn: !this.state.hiddenBtn} )
    }

    editMessage = event => {
        event.preventDefault()
        const editedMessage = {
            id: this.props.message.id,
            userId: parseInt(this.state.userId),
            message: this.state.message,
        }
        console.log(editedMessage)
        this.handleEditButton()
        this.props.updateAPI(editedMessage, "messages")
        .then(() => this.props.history.push("/"))
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

    componentDidMount () {
        this.getMetadata(this.state.songId)
    }

    render() {
        return (
            <React.Fragment key={this.props.song.id}>

                {/* <div className="form-group" hidden = {(this.state.hidden)? "hidden" : ""}>
                    <Input fluid type="text" onChange={this.handleFieldChange} id="message" value = {this.state.message} />
                    <Button type="submit" onClick={this.editMessage} className="btn btn-primary" size="tiny">Save</Button>
                </div> */}
                {/* <div className="song-div"> */}

                    <Table.Row>
                        <Table.Cell> {this.state.song}</Table.Cell>
                        <Table.Cell>{this.state.artist}</Table.Cell>
                        <Table.Cell>{this.state.album}</Table.Cell>
                        <Table.Cell>{this.state.duration}</Table.Cell>
                        <Table.Cell>
                            {
                            this.props.users
                                .filter(user => user.id === this.props.song.userId)
                                .map(user =>
                                    <div key={user.id}>
                                        <Image src={user.image} style={{ marginRight: '.5em', borderRadius: 100, width: 24 }} />
                                    </div>
                                )
                            }
                        </Table.Cell>
                    </Table.Row>

                    {/* <Comment.Text hidden = {(this.state.hidden)? "" : "hidden"}>{this.props.message.message}</Comment.Text> */}
                    {/* VVVV THIS IS TEMPORARY. DON'T FORGET TO CHANGE THIS FROM SONG.USERID BACK TO PLAYLIST.USERID */}
                    {this.props.song.userId === currentUserId ?
                        <Dropdown>
                            <Dropdown.Menu>
                                <Button onClick={this.handleEditButton} icon="edit" size="mini"></Button>
                                <Button onClick={() => this.props.deleteFromAPI("songsToPlaylist", this.props.song.id)}
                                    icon="trash" size="mini"></Button>
                            </Dropdown.Menu>
                        </Dropdown> : ""}
                {/* </div> */}
            </React.Fragment>
        )
    }
}