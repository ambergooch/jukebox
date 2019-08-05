import React, { Component } from "react"
import { Link } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react'

  //Use this to logout of Spotify everywhere
  // const url = 'https://accounts.spotify.com/en/logout '
  // const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
  // setTimeout(() => spotifyLogoutWindow.close(), 2000)
  const currentUserId = sessionStorage.getItem("spotify_user_id")
export default class NavBar extends Component {


handleLogout = (event)=>{
    sessionStorage.clear()
    const url = 'https://accounts.spotify.com/en/logout '
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    setTimeout(() => spotifyLogoutWindow.close(), 1000)
}


    render() {
        // console.log(this.props.users)
        return (
        <Menu inverted style={{position: 'sticky', top: 0, zIndex: 5, backgroundColor: 'black' }}>
                {
                    this.props.users
                        .filter(user => user.id === currentUserId)
                        .map(user =>
                            <Container key={user.id} fluid style={{marginRight: '100px'}}>
                                <Menu.Item position='right' style={{ marginRight: '.5em'}}>
                                    {user.displayName}
                                </Menu.Item>
                                <Menu.Item style={{padding: '4px'}}>
                                    <Image src={user.image} style={{ marginRight: '.5em', borderRadius: 100, width: 45 }} />
                                </Menu.Item>
                                <Dropdown item simple direction='left'>
                                <Dropdown.Menu>
                                    {/* <Dropdown.Item as={Link} to="/friends">Friends</Dropdown.Item> */}
                                    <Dropdown.Item as={Link} onClick={this.handleLogout} to="/login">Logout</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </Container>
                        )
                }

        </Menu>
        )
    }
}