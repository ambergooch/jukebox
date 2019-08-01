import React, { Component } from "react";
import { Button, Grid, Segment, Header, Container, Modal, Form, List } from 'semantic-ui-react'
import Spotify from "spotify-web-api-js"
// import TaskList from "../task/TaskList"
// import "./Home.css"
import MusicPlayer from "../player/MusicPlayer";
import PlayStatus from "../player/PlayStatus";
import SearchResults from '../search/SearchResults'

export default class Home extends Component{

  //Use this to logout of Spotify everywhere
  // const url = 'https://accounts.spotify.com/en/logout '
  // const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
  // setTimeout(() => spotifyLogoutWindow.close(), 2000)


  render(){
      console.log(this.props)
        return(
            <Segment placeholder className="home">
            <Grid columns={4} relaxed='very' stackable>
            <Grid.Column>
                <Container className="search">
                    <SearchResults {...this.props} />
                </Container>
                <Container className="music-player">
                    <PlayStatus {...this.props} token={this.props.token}/>
                    {/* <MusicPlayer {...this.props} token={this.props.token} getNowPlaying={this.getNowPlaying} /> */}
                  {/* {
                    this.props.messages.map(message =>
                        <MessageComponent key={message.id} message={message} {...this.props} />
                    )
                  }
                  <Form reply>
                    <Form.TextArea />
                    <Button onClick={this.postNewMessage} content='Send' labelPosition='left' icon='edit' primary />
                  </Form> */}
                </Container>

            </Grid.Column>

            {/* <Grid.Column>
              <Header>Tasks</Header> <Modal trigger={<Button content='Add' icon='plus square outline' size='mini' onClick={this.handleOpen} />} open={this.state.open}>
              <Modal.Header>Add A Task</Modal.Header>
              <Modal.Content>
              <Form>
                  <Form.Input onChange={this.handleFieldChange} id="task" label='Task' placeholder='ex: Take Out Trash' />
                  <Form.Input onChange={this.handleFieldChange} type="date" id="date_due" label='Date Due' />
                  <Button content='Add' primary onClick={this.handleAddTask} />
                  <Button content='Cancel' primary onClick={this.handleClose} />
              </Form>
              </Modal.Content>
            </Modal>
              <Container>
                <TaskList
                  key={this.props.tasks.id}
                  tasks={this.props.tasks}
                  deleteFromAPI={this.deleteFromAPI}
                  updateAPI={this.updateAPI}
                  {...this.props}
                />
              </Container>
            </Grid.Column> */}
            </Grid>
        </Segment>
        )
  }
}
