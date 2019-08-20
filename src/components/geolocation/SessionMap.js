import React, { Component } from "react"
import { Button, Header } from "semantic-ui-react"
import ReactMapGL, {GeolocateControl, Marker, Popup} from "react-map-gl"
import appKey from "../key"
import marker from './marker.png'
import 'mapbox-gl/dist/mapbox-gl.css'
import './SessionMap.css'


export default class SessionMap extends Component {

    state = {
        userLocation: {
            latitude: 0,
            longitude: 0
        },
        viewport: {
            latitude: 36.16,
            longitude: -86.78,
            zoom: 10.5
        },
        showPopup: null
    }

    getLocation = () => {
        console.log("got location")
        // Check whether browser supports Geolocation API or not
        if (navigator.geolocation) { // Supported
          // To add PositionOptions
        navigator.geolocation.getCurrentPosition(this.getPosition);
        } else { // Not supported
        alert("Oops! This browser does not support HTML Geolocation.");
        }
      }
      getPosition = (position) => {
        this.setState({
            userLocation: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        })
      }

      calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit==="K") { dist = dist * 1.609344 }
            if (unit==="N") { dist = dist * 0.8684 }
            console.log(dist)
            // return dist;
            if(dist <= .05) {
                return true
            } else {
                return false
            }
        }
    }

    componentDidMount () {
        console.log("comp mount")
        this.getLocation()
    }

    render () {
        console.log(this.state)
        console.log(this.props)
        const {viewport, showPopup, userLocation} = this.state
        return (
            <ReactMapGL {...viewport}
                mapboxApiAccessToken={appKey.mbToken}
                width="65vw"
                height="70vh"
                onViewportChange={viewport => {this.setState({viewport}); this.getLocation()}}>
                {
                    this.props.playlists.map(playlist =>
                        <div key={playlist.id}>
                            {/* {this.calculateDistance(userLocation.latitude, userLocation.longitude, playlist.latitude, playlist.longitude)} */}
                            <Marker key={playlist.id} latitude={playlist.latitude} longitude={playlist.longitude} offsetLeft={-20} offsetTop={-10}>
                                <img className="map-marker" src={marker} alt="marker" onClick={(event) => {event.preventDefault(); this.setState({showPopup: playlist.id})}}/>
                              {/* <Icon size='large' color='green' name='map marker alternate' onClick={(event) => {event.preventDefault(); this.setState({showPopup: true})}}/> */}
                            </Marker>
                            {this.calculateDistance(userLocation.latitude, userLocation.longitude, playlist.latitude, playlist.longitude) && showPopup === playlist.id ?
                                <Popup
                                    id={playlist.id}
                                    tipSize={6}
                                    latitude={playlist.latitude}
                                    longitude={playlist.longitude}
                                    closeButton={true}
                                    closeOnClick={false}
                                    onClose={() => this.setState({showPopup: null})}
                                    anchor="top"
                                    offsetTop={35}
                                    offsetLeft={12} >
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
                                            onClick={() => {console.log("button clicked"); this.props.setCode(playlist.access_code)}}
                                        />

                                    </div>
                                </Popup>
                                :
                                showPopup === playlist.id && <Popup
                                    tipSize={6}
                                    latitude={playlist.latitude}
                                    longitude={playlist.longitude}
                                    closeButton={true}
                                    closeOnClick={false}
                                    onClose={() => this.setState({showPopup: null})}
                                    anchor="top"
                                    offsetTop={15}
                                    offsetLeft={-8} >
                                    <div className='popup-div'>
                                        <Header>{playlist.title}</Header>
                                        <p>{playlist.description}</p>
                                        <Button
                                            disabled
                                            style={{borderRadius: 20, marginLeft: '30px'}}
                                            size='mini'
                                            positive
                                            icon='checkmark'
                                            labelPosition='right'
                                            content="Join session"
                                            // onClick={() => {this.props.setCode(playlist.access_code)}}
                                        />
                                        <p><em>This session is out of range.</em></p>
                                    </div>
                                </Popup>
                                }
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




