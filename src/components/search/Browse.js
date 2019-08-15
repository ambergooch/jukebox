import React, {Component} from 'react'
import Spotify from "spotify-web-api-js"
import { Icon, Button, Segment, Header, Grid } from "semantic-ui-react"
import BrowseCard from "./BrowseCard"

const spotifyAPI = new Spotify();

export default class Browse extends Component {

    state = {
        topTracks: []
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

    componentDidMount () {
        this.getTopTracks()
    }

    render() {
        console.log(this.state)
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
            </div>
        )
    }
}
