//As this is a small applicaiton declared actions here, otherwise 
//would have created other file 
import {
    google_api_key,
    yelp_api_key,
} from '../credentials';

export const FETCH_ALL_EVENTS = 'FETCH_ALL_EVENTS';
export const RECIEVE_ALL_EVENTS = 'RECIEVE_ALL_EVENTS';
export const RECIEVE_USER_LOCATION = 'RECIEVE_USER_LOCATION';
export const RECIEVE_USER_DISTANCE = 'RECIEVE_USER_DISTANCE';
export const SHOW_EVENT_MODAL = 'SHOW_EVENT_MODAL'

const cors_proxy = 'https://thingproxy.freeboard.io/fetch/';

export function receiveEvents(events) {
    return {
        type: RECIEVE_ALL_EVENTS,
        events
    };
}

export function receiveLocation(location) {
    return {
        type: RECIEVE_USER_LOCATION,
        location
    };
}

export function receiveDistance(distance) {
    return {
        type: RECIEVE_USER_DISTANCE,
        distance
    };
}


export function showEventModal(modal_show_status) {
    return {
        type: SHOW_EVENT_MODAL,
        modal_show_status
    };
}

function fetchUserLocation() {
    return (dispatch, getState) => {
        if ("geolocation" in navigator) {
             navigator.geolocation.getCurrentPosition(function (position) {
                 const user_location = {
                     latitude: position.coords.latitude,
                     longitude: position.coords.longitude
                 }
                 dispatch(receiveLocation(user_location))
                 dispatch(fetchDistance(getState().events, user_location))
             });
        } else {
            console.log("User Location Not Available")
        }
       
    }
}


function googleDistanceUrl(events, user_location) {
    const api_key = "key=" + google_api_key;
     
    let destinations = '&destinations=';
     
    events.forEach(function (event) {
         destinations += event.latitude + ',' + event.longitude + '|'
     });

    let origins = 'origins='+ user_location.latitude +',' +user_location.longitude

    return cors_proxy + "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&" + origins + '&' + api_key + '&' + destinations;
    
}



function fetchDistance(events, user_location) {
   
    return (dispatch, getState) => {
        return fetch(googleDistanceUrl(events, user_location), {
                method: 'GET',
            })
            .then(response => response.json())
            .then(json => dispatch(receiveDistance(json)));
    };
}


function yelpurl() {
    //Yelp API doesn't allow CORS hence using proxy to get data. 
    //https://github.com/Freeboard/thingproxy - API call throttled to 10 requests/second for each IP
    return cors_proxy + 'https://api.yelp.com/v3/events';
}


export function fetchEvents() {
    return (dispatch) => {
        return fetch(yelpurl(), {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + yelp_api_key,
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveEvents(json))
                dispatch(fetchUserLocation())
            });
    };
}

