import initialState from './initialState';
import {
    FETCH_ALL_EVENTS,
    RECIEVE_ALL_EVENTS,
    RECIEVE_USER_LOCATION,
    RECIEVE_USER_DISTANCE
} from '../actions/';


const reducer = (state = initialState, action) => {
  
  let newState;
  switch (action.type) {

    case FETCH_ALL_EVENTS:
      return action;

    case RECIEVE_USER_LOCATION:
      newState = Object.assign({}, state, {
        user_location:{
          latitude: action.location.latitude,
          longitude: action.location.longitude
        }
      })
      return newState;

    case RECIEVE_ALL_EVENTS:
      newState = Object.assign({}, state, {
        events: action.events.events,
        events_count: action.events.total
      })
      return newState;

    case RECIEVE_USER_DISTANCE:
    
      const newEvents = state.events.map((e, index) => {
         return Object.assign({}, e, {
           user_distance: action.distance.rows[0].elements[index],
         })
      }).slice();

      newState = Object.assign({}, state, {
        events: newEvents,
      })

      return newState;

    default:
      return state;
  }

}

export default reducer;