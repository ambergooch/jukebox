import React, { Component } from 'react';
import { Button, Grid, Container } from 'semantic-ui-react';
import appKey from "../key"


const authURL = `https://accounts.spotify.com/authorize?client_id=${appKey.client_id}&redirect_uri=http://localhost:3000/callback/&scope=${appKey.scope}&response_type=token&show_dialog=true`
// Probably won't need this later
// const loginURL = "http://localhost:3000/login"

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    spotifyUserId: ""
  }

  // getSpotifyUserId = () => {
  //   spotifyAPI.getMe().then(user => {
  //     this.setState({spotifyUserId: user.id})
  //     sessionStorage.setItem("spotify_user_id", user.id)
  //   })
  //   // THIS IS POSTING USER TO DATABASE MULTIPLE TIMES. RESOLVE TIMING ISSUE OR ADD CONDITIONAL TO FUNCTION
  //   // .then(() => this.saveUser())
  //   // console.log("user saved")
  // }

  windowPopup(url, title, w, h) {
    var left = (window.innerWidth/2)-(w/2);
    var top = (window.innerHeight/2)-(h/2);
    return window.open(url, title, 'width='+w+', height='+h+', top='+top+', left='+left);
  }

  handleLoginClick = (event) => {
    event.preventDefault()
    // Open the Auth flow in a popup.
    // this.props.getUserId()
    this.windowPopup(authURL, "Login with Spotify", 400, 500)
    console.log("saved")
  }

// 1. I need to save user to database
// 2. I need to set state
// 3. I need to add user to session storage

  // saveUser() {
  //     if (this.state.spotifyUserId ) {
  //       // if (sessionStorage.getItem("access_token") !== undefined) {
  //           console.log("save user")

  //           spotifyAPI.getMe()
  //           .then(user => {
  //             let newUser =
  //             {
  //               displayName: user.display_name,
  //               email: user.email,
  //               spotifyId: user.id,
  //               image: user.images[0].url
  //             }
  //             this.props.addToAPI("users", newUser)
  //           })
  //       } else {
  //         window.location = `${loginURL}`;
  //       }
  //     // }
  //   }
    componentDidMount() {
      sessionStorage.clear()
    }

    render() {
      console.log(this.props.getUserId)
        return (
          <div className="login-page" >
              <Container>
              <Grid columns={1} relaxed='very' stackable textAlign='center'>
                {/* <Grid.Row verticalAlign='middle'  fluid > */}


                <Container style={{marginTop: '200px', width: '2000px'}} fluid >

                  <Button  onClick={this.handleLoginClick} content='Connect to Spotify' size='big' color='green' style={{marginLeft: '500px', borderRadius: 20}}/>

                </Container>

              </Grid>


            </Container>
            </div>
        )
    }
}


  // logInUserAndGetInfo = (newUser) => {
  //   const token = this.props.token
  //   this.addToAPI("users", newUser)

  //   // this.props.setUser(newUser); // set user in redux state
  //   if (this.props.location.pathname === '/') {
  //     this.props.history.push('/'); // if there is no page the user wants to go to
  //     // then go to the home page
  //   } else {
  //     // if there is a page the user wants to go to then just send them there
  //     this.props.history.push();
  //   }
  // }

 // Spotify.getMe(payload)
      // .then(response => response.json())
      // .then(data => {
      //   this.me = data
      //   })

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