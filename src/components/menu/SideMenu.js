import React, { Component } from 'react'
import { Button, Icon, Input, Menu, Sidebar, Modal, Container, Form, Checkbox, TextArea } from 'semantic-ui-react'

import ApplicationViews from '../ApplicationViews';
import './SideMenu.css'

export default class SideMenu extends Component {
  state = {
    openAdd: false,
    openUnlock: false,
    activeItem: "",
    playlist: {
      userId: "1",
      title: "",
      access_code: null,
      locationId: 1
    }
  }
  //Go back and refactor for location info

  showAdd = () => this.setState({ openAdd: true })
  showUnlock = () => this.setState({ openUnlock: true })
  closeAdd = () => this.setState({ openAdd: false })
  closeUnlock = () => this.setState({ openUnlock: false })

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

createPlaylist = (event) => {
  event.preventDefault()
  const playlist = {

  }
}

constructNewAnimal = evt => {
  evt.preventDefault();
  if (this.state.employee === "") {
    window.alert("Please select a caretaker");
  } else {
    const animal = {
      name: this.state.animalName,
      breed: this.state.breed,
      // Make sure the employeeId is saved to the database as a number since it is a foreign key.
      employeeId: parseInt(this.state.employeeId)
    };

    // Create the animal and redirect user to animal list
    this.props
      .addAnimal(animal)
      .then(() => this.props.history.push("/animals"));
  }
};



  render() {
    const { visible, openAdd, openUnlock, dimmer } = this.state
    const { activeItem } = this.state
    return (

      <Menu className='side-menu' size='large' pointing secondary vertical inverted style={{width: 250, marginTop: '50px', border: 'none'}}>
        <Menu.Item as='a' name='add' className='green' style={{marginBottom: '15px', marginTop: '20px'}} active={activeItem === 'add'} onClick={(e) => {this.handleItemClick(e, 'add'); this.showAdd()}}>
          <Icon name='add circle' size='large'/>
          Create new session
        </Menu.Item>
        <Menu.Item as='a' name='find' className='green' style={{marginBottom: '15px'}} active={activeItem === 'find'} onClick={this.handleItemClick}>
          <Icon name='map marker alternate' size='large'/>
          Find a nearby session
        </Menu.Item>
        <Menu.Item as='a' name='unlock' className='green' style={{marginBottom: '15px'}} active={activeItem === 'unlock'} onClick={(e) => {this.handleItemClick(e, 'unlock'); this.showUnlock()}}>
          <Icon name='unlock alternate' size='large'/>
          Enter a session code
        </Menu.Item>

          <Modal size='tiny' dimmer={dimmer} open={openAdd} onClose={this.closeAdd} className='inverted' closeIcon>
            <Modal.Header>Start a new playlist</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Form inverted>
                  <Form.Field>
                    <label>Title</label>
                    <input placeholder='Party Mix #6' />
                  </Form.Field>
                  <Form.Field>
                    <label>Description</label>
                    <TextArea placeholder='Give your playlist a cool description' />
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
              <Button
                style={{borderRadius: 20}}
                positive
                content="Create"
                onClick={() => {this.createPlaylist()}}
              />
            </Modal.Actions>
          </Modal>

          <Modal size='tiny' dimmer={dimmer} open={openUnlock} onClose={this.closeUnlock} className='inverted' closeIcon>
            <Modal.Header>Enter a code to join a private session</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>If you have a code for an existing private session, enter it below.</p>
              {/* <Input className='code-input' size='massive' type='text' maxLength="1"
              value={this.state.inputValue[0]} onChange={(event) => {this.handleInputValueChange(0); this.changeFocus(0)}}/>
              <Input className='code-input' size='massive' type='text' maxLength="1"
              value={this.state.inputValue[1]} onChange={this.handleInputValueChange}/>
              <Input className='code-input' size='massive' type='text' maxLength="1"
              value={this.state.inputValue[2]} onChange={this.handleInputValueChange}/>
              <Input className='code-input' size='massive' type='text' maxLength="1"
              value={this.state.inputValue[3]} onChange={this.handleInputValueChange}/> */}
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
                onClick={() => {this.closeUnlock()}}
              />
            </Modal.Actions>
          </Modal>


      </Menu>

// const {
//   Modal,
//   Button,
//   Image,
//   Divider,
//   TransitionablePortal
// } = semanticUIReact

// class App extends React.Component {
//   state = { open: false }

//   handleOpen = () => {
//     this.setState({ open: true })
//   }

//   handleClose = () => {
//     this.setState({ open: false })
//   }

//   render() {
//     const { open } = this.state

//     return (
//       <div>
//         <style>{`
//           .ui.dimmer {
//             transition: background-color 0.5s ease;
//             background-color: transparent;
//           }

//           .modal-fade-in .ui.dimmer {
//             background-color: orange;
//           }
//         `}</style>

//         <Button content='Open' onClick={this.handleOpen} />

//         <TransitionablePortal
//           open={this.state.open}
//           onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
//           transition={{ animation: 'scale', duration: 500 }}
//         >
//           <Modal
//             open={true}
//             onClose={(event) => {
//               document.body.classList.remove('modal-fade-in')
//               this.handleClose()
//             }}
//             closeIcon
//           >
//             <Modal.Header>
//               Resize test
//             </Modal.Header>
//             <Modal.Content>
//               <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
//               <Divider />
//               <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
//               <Divider />
//               <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
//               <Divider />
//               <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
//             </Modal.Content>
//           </Modal>
//         </TransitionablePortal>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));

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