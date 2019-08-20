import React, {Component} from 'react'
import Spotify from "spotify-web-api-js"
import { Header, Grid } from "semantic-ui-react"
import BrowseCard from "./BrowseCard"

const spotifyAPI = new Spotify();

export default class Browse extends Component {

    state = {
        topTracks: [],
        savedTracks: []
    }

    getTopTracks = () => {
        spotifyAPI.getMyTopTracks({time_range: 'short_term', limit: 8})
        .then(data => {
                this.setState({
                    topTracks: data.items
                })

            // console.log("got currently playing", data)
        })
    }

    getSavedTracks = () => {
        spotifyAPI.getMySavedTracks({limit: 8})
        .then(data => {
            this.setState({
                savedTracks: data.items
            })
        })
    }

    componentDidMount () {
        this.getTopTracks()
        this.getSavedTracks()
    }

    render() {
        console.log(this.props)
        return (
            <div className="browse">
                <Header size='huge' style={{color: 'white'}}>Top Tracks</Header>
                <Grid relaxed centered columns={4}>
                {
                    this.state.topTracks.map((track, index) =>
                        <BrowseCard key={index} track={track} {...this.props} />
                    )
                }
                </Grid>
                {this.state.savedTracks.length === 8 ?
                <div>
                    <Header size='huge' style={{color: 'white', marginTop: '30px'}}>Saved Tracks</Header>
                    <Grid relaxed centered columns={4}>
                    {
                        this.state.savedTracks.map((savedTrack, index) =>
                            <BrowseCard key={index} track={savedTrack.track} {...this.props} />
                        )
                    }
                    </Grid>
                </div>
                : ""}
            </div>
        )
    }
}
