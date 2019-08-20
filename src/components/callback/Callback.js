import React, {Component} from 'react'

export default class Callback extends Component {
  state = {
    token: null
  }
  // componentDidMount () {
  //       // this.loginUser()
  //       console.log("loginUser")
  //       const token = window.location.hash.substr(1).split('&')[0].split('=')[1]
  //       console.log(token)
  //       if (token) {
  //         window.close()
  //         // window.opener.spotifyCallback(token)
  //         console.log(window)
  //         sessionStorage.setItem('access_token', token)
  //         this.props.history.push("/")
  //       }
  //     }

  // spotifyCallback = (payload) => {
  //       fetch("https://api.spotify.com/v1/me", {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${payload}`,
  //         "Content-Type": "application/json",
  //       }
  //       .then(response => response.json())
  //       .then(data => {
  //         this.setState({
  //           currentUser: data
  //         })
  //       })
  //     })
  //     }

  componentDidMount () {
    const token = window.location.hash.substr(1).split('&')[0].split('=')[1]
    if (token) {

      window.opener.sessionStorage.setItem("access_token", token)
      window.close()
    }
    this.props.getUserId()
    window.opener.location = "/"
  }

    render() {
        return (
            <div>
            <p>Getting Token...</p>
            <img src="" width="100px" alt="" />
          </div>
        )
    }
}
