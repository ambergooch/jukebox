import React, { Component } from 'react'
import Spotify from "spotify-web-api-js"

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
        this.createNewPlaylist()
    }

    render() {
        return (
        <div></div>
        )
    }
}
