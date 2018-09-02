import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import LocationMarker from './LocationMarker'; 


class EventDetailsModal extends React.Component {
  renderData() {
    const event = this.props.events[this.props.show_event_modal.event_index];
    const location = {
         event: {
           latitude: event.latitude,
           longitude: event.longitude,
           
          },
          user: this.props.user_location
      };
    
    return ( 
        <Modal show={this.props.show_event_modal} onHide={()=>this.props.eventsActions.showEventModal({state:false,event_index:null})}>
          <Modal.Header closeButton >
            <h2>{event.name}</h2>
          </Modal.Header>
          <Modal.Body>
            <h3>Start Time:</h3> <p>{event.time_start}</p>
            <h3> Distance: </h3> <p>{event.user_distance?event.user_distance.distance.text:"-"}</p >
            <h3>Cost:</h3> <p>{event.cost?event.cost:"Not Available"}</p>
            <h3>Description:</h3> <p>{event.description}</p>
            <LocationMarker location={location}> </LocationMarker>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.props.eventsActions.showEventModal({state:false,event_index:null})}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
  }

  render() {
    return (
        <div className="">
          {
            this.props.show_event_modal.event_index != null ?
            this.renderData()
            :
            <div className="">
        
            </div>
          }
        </div>
    );
  }
}

EventDetailsModal.propTypes = {
  eventsActions: PropTypes.object,
  show_event_modal: PropTypes.shape({
    state:PropTypes.bool,
    event_index: PropTypes.number
  }),
  events: PropTypes.array,
  user_location:PropTypes.object
};

function mapStateToProps(state) {
  return {
    show_event_modal: state.show_event_modal,
    events:state.events,
    user_location: state.user_location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsModal);