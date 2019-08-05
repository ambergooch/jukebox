import React, { Component } from 'react'
import { Button, Icon, Input, Menu, Sidebar, Modal, Container } from 'semantic-ui-react'

import ApplicationViews from '../ApplicationViews';
import './SideMenu.css'

export default class SideMenu extends Component {
  state = {
    visible: true,
    open: false,
    activeItem: "",
    inputValues: [],
    inputValue: ""
  }

  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  // handleHideClick = () => this.setState({ visible: false })
  // handleShowClick = () => this.setState({ visible: true })
  // handleSidebarHide = () => this.setState({ visible: false })



  addInputValue = e => {
    e.preventDefault();
    this.setState(({ inputValues, inputValue }) => ({
      inputValues: [...inputValues, ...inputValue.split(",")],
      inputValue: []
    }));
  };

//   FOR FOCUS CHANGE SEE https://codepen.io/anon/pen/OgPLQj?editors=1010
// https://stackoverflow.com/questions/55106620/react-parse-comma-separated-user-input

  removeInputValue(index) {
    this.setState({
      inputValues: this.state.inputValues.filter((_, i) => i !== index)
    });
  }

  handleInputValueChange = (event, index) => {
    this.state.inputValue[index] = event.target.value;
    this.setState(this.state.inputValue);
  };

focus() {
    this.textInput.focus();
  }


  changeFocus(index) {
   return event => {
       this.state.inputValues[index].focus()
   }
  }

  render() {
    const { visible, open, dimmer } = this.state
    const { activeItem } = this.state
    return (

      <Menu className='side-menu' size='large' pointing secondary vertical inverted style={{width: 250, marginTop: '50px', borderLeft: 'none'}}>
        <Menu.Item as='a' name='add' color='green' style={{marginBottom: '15px'}} active={activeItem === 'add'} onClick={this.handleItemClick}>
          <Icon name='add circle' size='large'/>
          Create new session
        </Menu.Item>
        <Menu.Item as='a' name='find' color='green' style={{marginBottom: '15px'}} active={activeItem === 'find'} onClick={this.handleItemClick}>
          <Icon name='map marker alternate' size='large'/>
          Find a nearby session
        </Menu.Item>
        <Menu.Item as='a' name='unlock' color='green' style={{marginBottom: '15px'}} active={activeItem === 'unlock'} onClick={(e) => {this.handleItemClick(e, 'unlock'); this.show()}}>
          <Icon name='unlock alternate' size='large'/>
          Enter existing session code
        </Menu.Item>
        <Modal size='tiny' dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Enter a code to join a private session</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>If you have a code for an existing private session, enter it below.</p>
            <Input className='code-input' size='massive' type='text' maxLength="1"
             value={this.state.inputValue[0]} onChange={(event) => {this.handleInputValueChange(0); this.changeFocus(0)}}/>
            <Input className='code-input' size='massive' type='text' maxLength="1"
             value={this.state.inputValue[1]} onChange={this.handleInputValueChange}/>
            <Input className='code-input' size='massive' type='text' maxLength="1"
             value={this.state.inputValue[2]} onChange={this.handleInputValueChange}/>
            <Input className='code-input' size='massive' type='text' maxLength="1"
             value={this.state.inputValue[3]} onChange={this.handleInputValueChange}/>


            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {/* <Button color='black' onClick={this.close}>
              Nope
            </Button> */}
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Join session"
              onClick={() => {this.close(); this.handleInputValueChange()}}
            />
          </Modal.Actions>
        </Modal>
      </Menu>
      // <Sidebar.Pushable className="body-div" as={Container} style={{height: '100vh'}}>
      //   <Button.Group>
      //     <Button disabled={visible} onClick={this.handleShowClick}>
      //       Show sidebar
      //     </Button>
      //     <Button disabled={!visible} onClick={this.handleHideClick}>
      //       Hide sidebar
      //     </Button>
      //   </Button.Group>


      //     <Sidebar
      //       as={Menu}
      //       animation='slide along'
      //       icon='labeled'
      //       inverted
      //       onHide={this.handleSidebarHide}
      //       vertical
      //       visible={visible}
      //       width='thin'
      //     >
      //       <Menu.Item as='a'>
      //         <Icon name='add circle' />
      //         Create new session
      //       </Menu.Item>
      //       <Menu.Item as='a'>
      //         <Icon name='map marker alternate' />
      //         Find a nearby session
      //       </Menu.Item>
      //       <Menu.Item as='a' onClick={this.show(true)}>

      //         <Icon name='unlock alternate' />
      //         Enter existing session code
      //       </Menu.Item>
      //     </Sidebar>

      //     <Sidebar.Pusher dimmed={visible}>
      //       <Container>
      //         <ApplicationViews />
      //       </Container>
      //     </Sidebar.Pusher>

        // <Modal size='tiny' dimmer={dimmer} open={open} onClose={this.close}>
        //   <Modal.Header>Enter a code to join a private session</Modal.Header>
        //   <Modal.Content image>
        //     <Modal.Description>
        //       <p>If you have a code for an existing private session, enter it below.</p>
        //     <Input className='code-input' size='massive' type='text' maxLength="1"
        //      value={this.state.inputValue[0]} onChange={(event) => {this.handleInputValueChange(0); this.changeFocus(0)}}/>
        //     <Input className='code-input' size='massive' type='text' maxLength="1"
        //      value={this.state.inputValue[1]} onChange={this.handleInputValueChange}/>
        //     <Input className='code-input' size='massive' type='text' maxLength="1"
        //      value={this.state.inputValue[2]} onChange={this.handleInputValueChange}/>
        //     <Input className='code-input' size='massive' type='text' maxLength="1"
        //      value={this.state.inputValue[3]} onChange={this.handleInputValueChange}/>


        //     </Modal.Description>
        //   </Modal.Content>
        //   <Modal.Actions>
        //     {/* <Button color='black' onClick={this.close}>
        //       Nope
        //     </Button> */}
        //     <Button
        //       positive
        //       icon='checkmark'
        //       labelPosition='right'
        //       content="Join session"
        //       onClick={() => {this.close(); this.handleInputValueChange()}}
        //     />
        //   </Modal.Actions>
        // </Modal>
      // </Sidebar.Pushable>
    )
  }
}