import React, { Component } from "react"
import { Link } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react'


const currentUserId = sessionStorage.getItem("spotify_user_id")
export default class NavBar extends Component {

    state = {
        activeItem: ''
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleLogout = (event)=>{
        sessionStorage.clear()
        const url = 'https://accounts.spotify.com/en/logout '
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
        setTimeout(() => spotifyLogoutWindow.close(), 1000)
}


    render() {
        const { activeItem } = this.state
        return (
        <Menu inverted pointing secondary style={{position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#141413', marginBottom: 0, boxShadow: "6px 6px 5px black", border: 'none' }}>
            <Menu.Item
                as={Link} to="/playlist"
                name='current playlist'
                active={activeItem === 'current playlist'}
                onClick={this.handleItemClick}
                color='green'
                style={{marginLeft: '280px', marginBottom: '1px'}}
          />
            <Menu.Item
                as={Link} to="/search"
                name='search'
                active={activeItem === 'search'}
                onClick={this.handleItemClick}
                color='green'
                style={{marginLeft: '30px', marginBottom: '1px'}}
          />
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