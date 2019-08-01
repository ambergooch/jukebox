import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Modal } from 'semantic-ui-react'

import ApplicationViews from '../ApplicationViews';

export default class SidebarExampleDimmed extends Component {
  state = {
    visible: false,
    open: false
}

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })



  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { visible, open, dimmer } = this.state
    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='slide along'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='add circle' />
              Create new session
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='map marker alternate' />
              Find a nearby session
            </Menu.Item>
            <Menu.Item as='a' onClick={this.show(true)}>

              <Icon name='unlock alternate' />
              Enter existing session code
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <ApplicationViews />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Modal size='tiny' dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Enter a code to join a private session</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
            <Input size='massive' type='number' />
            <Input size='massive' type='number' />
            <Input size='massive' type='number' />
            <Input size='massive' type='number' />
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Yep, that's me"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}