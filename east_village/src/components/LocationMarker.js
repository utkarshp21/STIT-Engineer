import React from "react";
import {google_api_key} from '../credentials';

import { withScriptjs, withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  {  
    var user_location ={
        lat: props.location.user.latitude,
        lng: props.location.user.longitude
    }
    var event_location = {
        lat: props.location.event.latitude,
        lng: props.location.event.longitude
    }
   
    return <GoogleMap defaultZoom={10} defaultCenter={{ lat: event_location.lat, lng:event_location.lng }}>
        {props.isMarkerShown && <Marker position={{ lat: event_location.lat, lng:event_location.lng }} />}
        {props.isMarkerShown && <Marker position={{ lat: user_location.lat, lng: user_location.lng }} />}
        <Polyline 
            path = {
                [user_location, event_location]
            }
            options={{ 
            strokeColor: '#00ffff',
            strokeOpacity: 1,
            strokeWeight: 2,
            icons: [{ 
                icon: "hello",
                offset: '10',
                repeat: '10px'
            }],
            }}
        />
    </GoogleMap>}
))


class LocationMarker extends React.Component {
    render() {
        return <MyMapComponent
            isMarkerShown
            googleMapURL = {"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="+google_api_key}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            location={this.props.location}
        />
    }
}

export default LocationMarker;
