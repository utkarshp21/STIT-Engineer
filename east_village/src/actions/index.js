import { google_api_key,yelp_api_key,} from '../credentials';

export const FETCH_ALL_EVENTS = 'FETCH_ALL_EVENTS';
export const RECIEVE_ALL_EVENTS = 'RECIEVE_ALL_EVENTS';
export const RECIEVE_USER_LOCATION = 'RECIEVE_USER_LOCATION';
export const RECIEVE_USER_DISTANCE = 'RECIEVE_USER_DISTANCE';
export const SHOW_EVENT_MODAL = 'SHOW_EVENT_MODAL'


const cors_proxy = 'https://thingproxy.freeboard.io/fetch/';

export function receiveEvents(events) {
    //Action dispatched after list of event is successfully fetched 
    //from the YELP API
    return {
        type: RECIEVE_ALL_EVENTS,
        events
    };
}

export function receiveLocation(location) {
    //Action dispatched after user location is succefully fetched
    return {
        type: RECIEVE_USER_LOCATION,
        location
    };
}

export function receiveDistance(distance) {
    //Action dispatched after distance between user and events is fetched 
    //from Google Map API 
    return {
        type: RECIEVE_USER_DISTANCE,
        distance
    };
}


export function showEventModal(modal_show_status) {
    //Action dispatched to show or hide event's detail view modal
    return {
        type: SHOW_EVENT_MODAL,
        modal_show_status
    };
}


export function fetchUserLocation() {
    //Function to fetch user location of user using Geolocation and handle condtion 
    //based on success and failure
    return (dispatch) => {
        if ("geolocation" in navigator) {
             navigator.geolocation.getCurrentPosition(function (position) {
                         const user_location = {
                             latitude: position.coords.latitude,
                             longitude: position.coords.longitude
                         }
                         dispatch(receiveLocation(user_location))
                         dispatch(fetchEvents())
                     }
                ,
                function showError(error) {
                    dispatch(fetchEvents())
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert("User denied the request for Geolocation.")
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("Your Location information is unavailable.")
                            break;
                        case error.TIMEOUT:
                            alert("The request to get your location timed out.")
                            break;
                        case error.UNKNOWN_ERROR:
                            alert("An unknown error occurred while fetching your location.")
                            break;
                    }
                }
            );
        } else {
            dispatch(fetchEvents())
            alert("Geolocation is not supported by this browser.");
        }
       
    }
}


function googleDistanceUrl(events, user_location) {
    //Function to formulate request URL for fetching  distance between user location and various events by
    //using google's distance matrix API

    const api_key = "key=" + google_api_key;
     
    let destinations = '&destinations=';
     
    events.forEach(function (event) {
         destinations += event.latitude + ',' + event.longitude + '|'
     });

    let origins = 'origins='+ user_location.latitude +',' +user_location.longitude
    
    return cors_proxy + "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&" + origins + '&' + api_key + '&' + destinations;
    
}



function fetchDistance(events, user_location) {
    //Function to fetch distance between user location and various events by
    //using google's distance matrix API
    return (dispatch, getState) => {
        return fetch(googleDistanceUrl(events, user_location), {
                method: 'GET',
            })
            .then(response => response.json())
            .then(json => {dispatch(receiveDistance(json))}
        );
    };
}


function yelpurl(location) {
    //Function to formulate request URL for fetching events from YELP 
    if (location.latitude){
        return cors_proxy + 'https://api.yelp.com/v3/events?limit=20&latitude=' + location.latitude + '&longitude=' + location.longitude;
    }
    return cors_proxy + 'https://api.yelp.com/v3/events?limit=20';

}


function fetchEvents() {
    //Function to fetch events from YELP
    return (dispatch, getState) => {
        return fetch(yelpurl(getState().user_location), {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + yelp_api_key,
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveEvents(json))
                if (getState().user_location.latitude){
                    dispatch(fetchDistance(getState().events, getState().user_location))
                }       
            });
    };
}

