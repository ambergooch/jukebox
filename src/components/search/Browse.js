import React, {Component} from 'react'
import { Icon, Button, Segment, Header } from "semantic-ui-react"

// const spotifyAPI = new Spotify();

export default class BrowseStuff extends Component {

 addToPlaylist = () => {

 }

    render() {
        return (
            <div className="browse">
                <Segment placeholder inverted>
                    <Header icon>
                    <Icon name='music' color='green' />
                    <br />
                    To get started, either create a new session or enter the access code of an existing session.
                    </Header>
                    <Segment.Inline>
                    {/* <Button primary>Clear Query</Button>
                    <Button>Add Document</Button> */}
                    </Segment.Inline>
                </Segment>
            </div>
        )
    }
}
