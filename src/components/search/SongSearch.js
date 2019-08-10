import React, {Component} from 'react'
import { Icon } from "semantic-ui-react"
import Spotify from "spotify-web-api-js"
import "./SongSearch.css"

const spotifyAPI = new Spotify()


export default class SongSearch extends Component {

    state = {
        isPlaying: false,
        queue: [],
        songResult: {

            uri: null,
            name: null,
            artist: null,
            cover: null,

        }
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

    addToQueue = (trackURI, trackID) => {
        // this.state.isPlaying === false &&
        // this.state.songResult.uri === data.uri &&
        // spotifyAPI.getMyCurrentPlaybackState()
        //   .then(data => {
        // if (this.state.songResult.uri === data.item.uri && this.state.queue.length === 0) {
        //   this.playSong(trackURI)
        // } else {
            // console.log(data)
            const song = {
                spotifyId: sessionStorage.getItem("spotify_user_id"),
                playlistId: this.props.currentPlaylistId,
                song_uri: trackURI,
                song_id: trackID
            }
            this.props.addToAPI("songsToPlaylist", song)
            // this.setState({
            //     queue: {
            //         uri: trackURI,
            //         name: songTitle,
            //         artist: artistName,
            //         cover: coverArt
            //     }
            // })

        //   this.state.queue.push({
        //     "uri": trackURI,
        //     "name": songTitle,
        //     "artist": artistName,
        //     "cover": coverArt
        //   })
        // }
        // console.log(data)
    //   })

    }




    render() {
        return (
            <div className="song-results">
            {
            this.props.tracks.map( (track, index) =>
                <div key={index}>

                    <button className='add' onClick={(event) => { event.preventDefault();this.addToQueue(track.uri, track.id, track.name, track.artists[0].name, track.album.images[0].url)}}>
                        <Icon color="grey" size="large" name="plus circle" />
                    </button>
                {track.name} by {track.artists[0].name}
                {/* <img src={track.album.images[0].url} style={{width: 100}} alt="" /> */}
                </div>
                )
            }
            </div>
        )
    }
}

//

