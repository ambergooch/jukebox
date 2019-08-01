import React, { Component } from 'react';
import Spotify from "spotify-web-api-js"
import { Link } from "react-router-dom"
import { Menu, Segment, Tab } from 'semantic-ui-react'
import SongList from "./SongList"
import ArtistList from "./ArtistList"
import AlbumList from "./AlbumList"
import BrowseStuff from "./BrowseStuff"

const spotifyAPI = new Spotify();

export default class SearchResults extends Component {

    state = {
        activeItem: "Songs",
        searchTerm: null,
        tracks: [],
        artists: [],
        albums: []
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    searchTracks = (searchTerm) => {
        spotifyAPI.searchTracks(searchTerm)
          .then((data) => {
            // console.log("Search for 'tracks' results", data.tracks.items)
            this.setState({
              tracks: data.tracks.items
            })
        })
    }
    searchArtists = (searchTerm) => {
        spotifyAPI.searchArtists(searchTerm)
          .then((data) => {
            // console.log("Search for 'artists' results", data.artists.items)
            this.setState({
              artists: data.artists.items
            })
        })
    }
    searchAlbums = (searchTerm) => {
        spotifyAPI.searchAlbums(searchTerm)
          .then((data) => {
            // console.log("Search for 'albums' results", data.albums.items)
            this.setState({
              albums: data.albums.items
            })
        })
    }
    updateSearchTerm = (event) => {
    this.setState({
        searchTerm: event.target.value
    });
    }

    render() {
        console.log(this.state.searchTerm)
        const { activeItem } = this.state
        return (
            <div className="search-container">
                <form onSubmit={() => { this.searchTracks(this.state.searchTerm);}}>
                    <input onChange={this.updateSearchTerm} type="text" placeholder="Search..." />
                    {/* <input onChange={(event) => { event.preventDefault(); this.updateSearchTerm(event); this.searchTracks(this.state.searchTerm); this.searchArtists(this.state.searchTerm); this.searchAlbums(this.state.searchTerm)}} type="text" placeholder="Search..." /> */}
                    <button onClick={(event) => { event.preventDefault(); this.searchTracks(this.state.searchTerm); this.searchArtists(this.state.searchTerm); this.searchAlbums(this.state.searchTerm)}}>
                    </button>
                </form>
                <div>
                    {
                    this.state.searchTerm !== null ?
                    (<Menu pointing secondary>
                        <Menu.Item  as= {Link} to="/search/"name='Songs' active={activeItem === 'Songs'} onClick={this.handleItemClick} />
                        <Menu.Item
                            as= {Link}
                            to="/search"
                            name='Artists'
                            active={activeItem === 'Artists'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            as= {Link}
                            to="/search"
                            name='Albums'
                            active={activeItem === 'Albums'}
                            onClick={this.handleItemClick}
                        />
                        {/* <Menu.Item
                            as= {Link}
                            to="/search"
                            name='Browse'
                            active={activeItem === 'Browse'}
                            onClick={this.handleItemClick}
                        /> */}
                        </Menu> ) : <BrowseStuff />
                    }
                </div>
                <div>
                    {
                        this.state.activeItem === 'Songs' ?
                            (<SongList {...this.props} tracks={this.state.tracks} />) :
                        this.state.activeItem === 'Artists' ?
                        (<ArtistList artists={this.state.artists}/>) :
                        (this.state.activeItem === 'Albums') ?
                        ( <AlbumList albums={this.state.albums}/>) :
                        //anything else show SongList
                        ( <BrowseStuff />)
                    }
                    {/* <SearchSongs {...this.props} tracks={this.state.tracks}/> */}
                </div>
            </div>

        )
    }
}
{/* <div className="song-results">
{
this.state.tracks.map( (track, index) =>
    <div key={index}>
    {track.name}
    by {track.artists[0].name}
    <img src={track.album.images[0].url} style={{width: 100}} alt="" />
    </div>
    )
}
</div> */}

{/* <div className="artist-results">
{
this.state.artists.map( (artist, index) =>
    <div key={index}>
    {artist.name}
    <img src={track.album.images[0].url} style={{width: 100}} alt="" />
    </div>
    )
}
</div> */}

