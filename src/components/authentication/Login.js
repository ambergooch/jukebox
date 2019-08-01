import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header, Icon, Divider } from 'semantic-ui-react';
import appKey from "../key"
import Spotify from "spotify-web-api-js"
// import { Link } from 'react-router-dom';
// import { loginUser } from '../auth/userManager';
// import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link,Paper, Box, Grid, Typography} from '@material-ui/core'

const spotifyAPI = new Spotify();

const authURL = `https://accounts.spotify.com/authorize?client_id=${appKey.client_id}&redirect_uri=http://localhost:3000/callback/&scope=${appKey.scope}&response_type=token`
// Probably won't need this later
const loginURL = "http://localhost:3000/login"

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    spotifyUserId: ""
  }

  logInUserAndGetInfo = (newUser) => {
    const token = this.props.token
    this.addToAPI("users", newUser)
    .then(() => sessionStorage.setItem("access_token", token))
    // this.props.setUser(newUser); // set user in redux state
    if (this.props.location.pathname === '/') {
      this.props.history.push('/'); // if there is no page the user wants to go to
      // then go to the home page
    } else {
      // if there is a page the user wants to go to then just send them there
      this.props.history.push();
    }
  }

  getSpotifyUserId = () => {
    spotifyAPI.getMe().then(user => {
      this.setState({spotifyUserId: user.id})
      sessionStorage.setItem("spotify_user_id", user.id)
    })
  }

  windowPopup(url, title, w, h) {
    var left = (window.innerWidth/2)-(w/2);
    var top = (window.innerHeight/2)-(h/2);
    return window.open(url, title, 'width='+w+', height='+h+', top='+top+', left='+left);
  }

  handleLoginClick = (event) => {
    event.preventDefault()
    // Open the Auth flow in a popup.
    this.windowPopup(authURL, "Login with Spotify", 400, 500)
    this.getSpotifyUserId()
    this.saveUser()
  }

        // fetch("https://api.spotify.com/v1/me", {
        //   method: "GET",
        //   headers: {


// 1. I need to save user to database
// 2. I need to set state
// 3. I need to add user to session storage

  saveUser() {
      if (this.state.spotifyUserId) {
        if (sessionStorage.getItem("access_token") !== null) {
 console.log("save user")
        //      fetch("https://api.spotify.com/v1/me", {
        //   method: "GET",
        //   headers: {
        //     authorization: `Bearer ${payload}`,
        //     "Content-Type": "application/json",
        //   }
        //   .then(response => response.json())
        //   .then(data => {
        //     this.setState({
        //       currentUser: data
        //     })
        //   })
        // });
            spotifyAPI.getMe()
            .then(user => {
                console.log(user)
              let newUser = {
                displayName: user.display_name,
                email: user.email,
                spotifyId: user.id,
                image: user.images[0].url
              };
              this.logInUserAndGetInfo(newUser);
              // this.props.fetchRecentlyPlayed({ limit: 12 });
            })
            // this.props.history.push("/")
        } else {
          window.location = `${loginURL}`;
        }
      }
    }


    render() {
      // console.log(popup)
      console.log(window)
      console.log(this.state.currentUser)
        return (
          <div>
              <Segment placeholder>
              <Grid columns={1} relaxed='very' stackable textAlign='center'>
                <Grid.Row verticalAlign='middle'>
                {/* <Grid.Column>
                  <Form>
                    <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username' />
                    <Form.Input icon='lock' iconPosition='left' label='Password' type='password' />

                    <Button content='Login' primary />
                  </Form>
                </Grid.Column> */}

                <Grid.Column verticalAlign='middle'>
                  <Header icon>
                    <Icon name='world' />
                    Sign in with Spotify
                  </Header>

                  <Button onClick={this.handleLoginClick} content='Connect' size='big' />

                </Grid.Column>
                </Grid.Row>
              </Grid>

              {/* <Divider vertical>Or</Divider> */}
            </Segment>
            </div>
        )
    }
}

 // Spotify.getMe(payload)
      // .then(response => response.json())
      // .then(data => {
      //   this.me = data
      //   })

  //     saveUser() {
  //       console.log(this.state.currentUser);
  //       // Why is that here? There are no props
  //       if (this.state.currentUser !== null) {
  //         if (sessionStorage.getItem("access_token") !== null) {
  //  console.log("save user")
  //             Spotify.getMe()
  //             .then(user => {
  //                 console.log(user)
  //               let newUser = {
  //                 displayName: user.display_name,
  //                 email: user.email,
  //                 spotifyId: user.id,
  //                 image: user.images[0].url
  //               };
  //               this.logInUserAndGetInfo(newUser);
  //               // this.props.fetchRecentlyPlayed({ limit: 12 });
  //             })
  //             this.props.history.push("/")
  //         } else {
  //           window.location = `https://accounts.spotify.com/authorize?client_id=${
  //             appKey.client_id
  //           }&redirect_uri=http://localhost:3000/callback/&scope=${
  //             appKey.scope
  //           }&response_type=token`;
  //         }
  //       }
  //     }