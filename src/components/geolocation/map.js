import React, { Component } from "react"
import { Route, Redirect } from 'react-router-dom'


export default class Map extends Component {

    state = {
        location: {
            lat: 0,
            long: 0
        }
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

    // getLocation = () => {
    //     navigator.geolocation.getCurrentPosition(postion) {
    //         this.setState({
    //             location: {
    //                 lat: position.coords.latitude,
    //                 long: position.coords.longitude
    //             }
    //         })
    //     }
    // }

    render () {
        return (
            <div></div>
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




