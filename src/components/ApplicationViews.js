import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
// import { withRouter } from 'react-router'
import Spotify from "spotify-web-api-js"
import Login from './authentication/Login'
import Home from './home/Home'
import SearchResults from './search/SearchResults'


export default class ApplicationViews extends Component {

    getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }

    render() {
        return (
            <React.Fragment>
                <Route path="/login" render={props => {
                    return <Login  />
                 }} />
                <Route exact path="/" render={(props) => {
                    return <Home {...props} token={this.getHashParams().access_token}/>
                }} />{
                <Route path="/search" render={(props) => {
                    return <SearchResults />
                }} />
                /* <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props}
                        animals={this.state.animals}
                        owners={this.state.owners}
                        deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                       addAnimal={this.addAnimal}
                       employees={this.state.employees} />
                }} />  */}


            </React.Fragment>
        )
    }
}

// export default withRouter(ApplicationViews)
