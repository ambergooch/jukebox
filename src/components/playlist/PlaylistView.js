import React, { Component } from 'react'
import Spotify from "spotify-web-api-js"
import SongCard from "./SongCard"
import { Message, Table } from 'semantic-ui-react'

const spotifyAPI = new Spotify();


export default class PlaylistView extends Component {

    state = {
        addSong: "",
        playlist: []
    }

    // playSong = () => {
    //     spotifyAPI.play()
    // }
    createNewPlaylist = () => {
        const spotifyId = sessionStorage.getItem("spotify_user_id")
        spotifyAPI.createPlaylist(spotifyId)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // this is when to set location
        })
    }

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
        return (
        //    <Message floating attached className="playlist">
            <Table basic='very' selectable singleLine >
            <Table.Header>
              <Table.Row>
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
                        song={song} />
                )
            }
            </Table.Body>
            </Table>
            // </Message>

        )
    }
}
