import React, { Component } from 'react'
import Spotify from "spotify-web-api-js"
import SongCard from "./SongCard"
import { Message, Table } from 'semantic-ui-react'

const spotifyAPI = new Spotify();


export default class PlaylistView extends Component {

    state = {
        // addSong: "",
        // playlist: [],
        isPlaying: false,
        currentSongUri: "",
        currentSongId: ""
    }

    createNewPlaylist = () => {
        const spotifyId = sessionStorage.getItem("spotify_user_id")
        spotifyAPI.createPlaylist(spotifyId)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // this is when to set location
        })
    }

    getCurrentPlayback = () => {
        spotifyAPI.getMyCurrentPlaybackState()
        .then(data => {
                this.setState({
                    isPlaying: true,
                    currentSongUri: data.uri,
                    currentSongId: data.id
                })

            console.log("got currently playing")
        })

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
    }

    render() {
        // this.getCurrentPlayback()
        // console.log(this.state.currentSongUri)
        return (
        //    <Message floating attached className="playlist">
            <Table basic='very' selectable singleLine >
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Artist</Table.HeaderCell>
                    <Table.HeaderCell>Album</Table.HeaderCell>
                    <Table.HeaderCell>Duration</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                {
                    this.props.songs.map(song =>
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
            // </Message>

        )
    }
}
