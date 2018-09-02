import initialState from './initialState';
import {
    FETCH_ALL_EVENTS,
    RECIEVE_ALL_EVENTS,
    RECIEVE_USER_LOCATION,
    RECIEVE_USER_DISTANCE,
    SHOW_EVENT_MODAL
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
    
    case SHOW_EVENT_MODAL:
      newState = Object.assign({}, state, {
        show_event_modal: Object.assign({}, state.show_event_modal, {
          state: action.modal_show_status.state,
          event_index: action.modal_show_status.event_index
        }),
      })
      return newState

    default:
      return state;
  }

}

export default reducer;