import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Button, Icon, Menu, Modal, Form, Checkbox, TextArea, Header } from 'semantic-ui-react'
import randomize from 'randomatic'
import ReactCodeInput from 'react-code-input'
// import { reactCodeInput } from 'CodeInputField.scss'
// import SingleCharInput from 'react-single-char-input'
// import {RICIBs} from 'react-individual-character-input-boxes';
import './SideMenu.css'


export default class SideMenu extends Component {
  state = {
    openAdd: false,
    openCode: false,
    openUnlock: false,
    activeItem: "",
    codeInput: "",


    userId: sessionStorage.getItem("spotify_user_id"),
    title: "",
    description: "",
    accessCode: parseInt(randomize('0', 4)),
    latitude: 0,
    longitude: 0

  }


  showAdd = () => this.setState({ openAdd: true })
  showUnlock = () => this.setState({ openUnlock: true })
  closeAdd = () => this.setState({ openAdd: false })
  closeCode = () => this.setState({ openCode: false })
  closeUnlock = () => this.setState({ openUnlock: false })

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleInput = (input) => {
    this.setState({ codeInput: input })
  }


  // playlistAuth = (event) => {
  //   event.preventDefault()
  //   let playlistMatch = this.props.playlists.filter(playlist =>
  //       (playlist.spotifyId === this.state.userId && playlist.id === this.props.currentPlaylistId))

  // }

  getLocation = () => {
    // Check whether browser supports Geolocation API or not
    if (navigator.geolocation) { // Supported
      // To add PositionOptions
    navigator.geolocation.getCurrentPosition(this.getPosition);
    } else { // Not supported
    alert("Oops! This browser does not support HTML Geolocation.");
    }
  }
  getPosition = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })

  }


createPlaylist = (event) => {
  event.preventDefault()

  const playlist = {
    spotifyId: this.state.userId,
    title: this.state.title,
    description: this.state.description,
    access_code: this.state.accessCode,
    latitude: this.state.latitude,
    longitude: this.state.longitude
  }

  this.props.addToAPI("playlists", playlist)
  .then(this.props.setCurrentPlaylist)


}

confirmCodeClick = () => {
  this.closeCode()
  this.closeAdd()
  this.props.history.push("/playlist")
}


componentDidMount () {
  this.getLocation()
  console.log(this.state.location)
}


  render() {
    // this.getLocation()


    const { openAdd, openUnlock, dimmer, activeItem } = this.state
    console.log(this.state.codeInput)


    return (
      <Menu className='side-menu' size='large' pointing secondary vertical inverted style={{width: 250, marginTop: '50px', border: 'none'}}>
        <Menu.Item as='a' name='add' className='green' color='green' style={{marginBottom: '15px', marginTop: '20px'}} active={activeItem === 'add'} onClick={(e) => {this.handleItemClick(e, 'add'); this.showAdd()}}>
          <Icon name='add circle' size='large'/>
          Create new session
        </Menu.Item>
        <Menu.Item as={Link} to='/map' name='find' className='green' color='green' style={{marginBottom: '15px'}} active={activeItem === 'find'} onClick={this.handleItemClick}>
          <Icon name='map marker alternate' size='large'/>
          Find a nearby session
        </Menu.Item>
        <Menu.Item as='a' name='unlock' className='green' style={{marginBottom: '15px'}} active={activeItem === 'unlock'} onClick={(e) => {this.handleItemClick(e, 'unlock'); this.showUnlock()}}>
          <Icon name='unlock alternate' size='large'/>
          Enter a session code
        </Menu.Item>


            {/* {playlist.userId === this.props.currentUserId ? */}
              <Modal size='tiny' open={openAdd} onClose={this.closeAdd} className='inverted' closeIcon>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                  <Modal.Description>
                    <Header>Default Profile Image</Header>

                  </Modal.Description>
                </Modal.Content>
              </Modal>
              :
            <Modal size='tiny' dimmer={dimmer} open={openAdd} onClose={this.closeAdd} className='inverted' closeIcon>
              <Modal.Header>Start a new playlist</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Form inverted>
                    <Form.Field>
                      <label>Title</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="title"
                        placeholder='Party Mix #6' />
                    </Form.Field>
                    <Form.Field>
                      <label>Description</label>
                      <TextArea
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="description"
                        placeholder='Give your playlist a cool description' />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox label='Make public' />
                    </Form.Field>
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                {/* <Button color='black' onClick={this.close}>
                  Nope
                </Button> */}

                <Modal
                  // open={open}
                  onOpen={this.open}
                  // onClose={this.close}
                  size='tiny'
                  trigger={
                    <Button
                      style={{borderRadius: 20}}
                      positive
                      content="Create"
                      onClick={this.createPlaylist}
                    />
                  }
                >
                  <Modal.Header>Your Access Code</Modal.Header>
                  <Modal.Content>
                    <p>This is the access code for your new playlist, <strong>{this.state.title}</strong>. Give this number to your guests so that they can join your session.</p>
                    <div className="modal-code-div">
                      <strong>{this.state.accessCode}</strong>
                    </div>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button icon='check' content='Got it!' onClick={this.confirmCodeClick} />
                  </Modal.Actions>
                </Modal>
              </Modal.Actions>
            </Modal>




          <Modal size='tiny' dimmer={dimmer} open={openUnlock} onClose={this.closeUnlock} className='inverted' closeIcon>
            <Modal.Header>Enter a code to join a private session</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>If you have a code for an existing private session, enter it below.</p>
                <div className='code-input-box-div'>
                  <ReactCodeInput
                    fields={4}
                    type='password'
                    onChange={this.handleInput}
                    autoFocus
                    inputStyle={{
                      borderRadius: '8px',
                      border: '1px solid lightgrey',
                      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 0px',
                      margin: '10px',
                      paddingLeft: '16px',
                      width: '60px',
                      height: '70px',
                      fontSize: '40px',
                      boxSizing: 'border-box'
                    }}
                    style={{marginLeft: '90px'}}
                    // // handleOutputString={this.handleInput}
                  />
                </div>

              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {/* <Button color='black' onClick={this.close}>
                Nope
              </Button> */}
              <Button
                style={{borderRadius: 20}}
                positive
                icon='checkmark'
                labelPosition='right'
                content="Join session"
                onClick={() => {this.closeUnlock(); this.props.setCode(this.state.codeInput)}}
              />
            </Modal.Actions>
          </Modal>
      </Menu>
    )
  }
}