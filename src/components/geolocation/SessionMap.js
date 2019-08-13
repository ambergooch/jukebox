import React, { Component } from "react"
import { Route, Redirect } from 'react-router-dom'
import { Icon, Button, Header } from "semantic-ui-react"
import ReactMapGL, {GeolocateControl, Marker, Popup} from "react-map-gl"
import appKey from "../key"
import 'mapbox-gl/dist/mapbox-gl.css'
import './SessionMap.css'


export default class SessionMap extends Component {

    state = {
        location: {
            lat: 0,
            long: 0
        },
        viewport: {
            latitude: 36.16,
            longitude: -86.78,
            zoom: 10.5
        },
        showPopup: false
    }

    getLocation = () =>{
        const position = {};
        const geolocation = navigator.geolocation;
        if (geolocation) {
            geolocation.getCurrentPosition(findLocal, showEror);
        }
        function findLocal(position){
            position.lat = position.coords.latitude;
            position.lng = position.coords.longitude;
        }
        function showEror(){console.log(Error)}
        return position;
        };
    // markPlaylists = () => {
    //     const playlists = this.props.playlists
    //     for(let i = 0; i < playlists.length; i++) {
    //         var obj = playlists[i];
    //         let myLatlng = new ReactMapGL(obj.lng, obj.lat);
    //         let marker = new Marker()
    //         .setLngLat(myLatlng)
    //         .setPopup(new Popup({ offset: 25 })
    //         .setHTML('<h3>' + obj.name + '</h3><p>' + obj.address1 + '</p>'))
    //         .addTo(ReactMapGL);
    //       }
    // }

    render () {
        console.log(this.state)
        console.log(this.props)
        const {viewport, showPopup} = this.state
        return (
            <ReactMapGL {...viewport}
                mapboxApiAccessToken={appKey.mbToken}
                width="65vw"
                height="80vh"
                onViewportChange={viewport => this.setState({viewport})}>
                {
                    this.props.playlists.map(playlist =>
                        <div key={playlist.id}>

                            <Marker  latitude={playlist.latitude} longitude={playlist.longitude} offsetLeft={-20} offsetTop={-10}>
                                <Icon size='large' color='green' name='map marker alternate' onClick={() => this.setState({showPopup: true})}/>
                            </Marker>
                            {showPopup && <Popup
                                tipSize={6}
                                latitude={playlist.latitude}
                                longitude={playlist.longitude}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => this.setState({showPopup: false})}
                                anchor="top"
                                offsetTop={15}
                                offsetLeft={-8} >
                                <div className='popup-div'>
                                    <Header>{playlist.title}</Header>
                                    <p>{playlist.description}</p>
                                    <Button
                                        style={{borderRadius: 20, marginLeft: '30px'}}
                                        size='mini'
                                        positive
                                        icon='checkmark'
                                        labelPosition='right'
                                        content="Join session"
                                        onClick={() => {this.props.setCode(playlist.access_code)}}
                                    />

                                </div>
                            </Popup> }
                        </div>
                    )
                }
                <GeolocateControl
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
                />
          </ReactMapGL>
        )
    }
}


// }function getLocation() {
//     return new Promise((resolve) => {
//       navigator.geolocation.getCurrentPosition((position) => {
//         resolve({
//           lat: position.coords.latitude,
//           long: position.coords.longitude
//         });
//       }, () => {
//         resolve(fetch('https://ipapi.co/json')
//           .then(res => res.json())
//           .then(location => {
//             return {
//               lat: location.latitude,
//               lng: location.longitude
//             };
//           }));
//       });
//     });
//   }
//   const getLocation = () =>{
//     const pos = {};
//     const geolocation = navigator.geolocation;
//     if (geolocation) {
//        geolocation.getCurrentPosition(findLocal, showEror);
//     }
//     function findLocal(position){
//        pos.lat = position.coords.latitude;
//        pos.lng = position.coords.longitude;
//     }
//     function showEror(){console.log(Error)}
//     return pos;
//  };




