import React, {Component} from 'react'
import { Icon, Button, Grid, Image, Dimmer } from "semantic-ui-react"
import "./SongSearch.css"

// const spotifyAPI = new Spotify();

export default class ArtistList extends Component {

    state = {
        active: ""
    }

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    render() {
        console.log(this.props)
        const { active } = this.state
        const content = (
            <div>
              {/* <Header as='h2' inverted>
                Title
              </Header> */}

              {/* <Button primary>Add</Button>
              <Button>View</Button> */}
                <Icon size='huge' name='play circle outline' />
                <Icon.Group size='big'>
                    <Icon size='big' name='circle outline' />
                    <Icon name='add' />
                </Icon.Group>
            </div>
          )
        return (
            <Grid.Column className="artist-results">


                <div key={this.props.index}>

                {/* <Image src={this.props.track.album.images[0].url} style={{width: 100}} alt="" /> */}

                {/* by {track.artists[0].name} */}

                <Dimmer.Dimmable
                    circular
                    as={Image}
                    dimmed={active}
                    dimmer={{ active, content }}
                    onMouseEnter={this.handleShow}
                    onMouseLeave={this.handleHide}
                    size='medium'
                    src={this.props.track.album.images[0].url}
                />
                <p style={{color: 'grey'}}>{this.props.track.name}</p>
                </div>


            </Grid.Column>
        )
    }
}
