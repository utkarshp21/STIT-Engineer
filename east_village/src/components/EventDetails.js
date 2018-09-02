import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import {Modal,Button} from 'react-bootstrap';


// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class EventDetailsModal extends React.Component {
    
  componentWillMount() { 
    //    this.props.eventsActions.fetchEvents();
  }
  renderData() {
   debugger;
    return ( 
        <Modal show={this.props.show_event_modal} onHide={()=>this.props.eventsActions.showEventModal({state:false,event_index:null})}>
          <Modal.Header closeButton >
            <Modal.Title><h2>{this.props.events[this.props.show_event_modal.event_index].name}</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Start Time:</h3> <p>{this.props.events[this.props.show_event_modal.event_index].time_start}</p>
            <h3>Distance :</h3> <p>{this.props.events[this.props.show_event_modal.event_index].user_distance?this.props.events[this.props.show_event_modal.event_index].user_distance.distance.text:"-"}</p>
            <h3>Cost:</h3> <p>{this.props.events[this.props.show_event_modal.event_index].cost?this.props.events[this.props.show_event_modal.event_index].cost:"Not Available"}</p>
            <h3>Description: </h3> <p>{this.props.events[this.props.show_event_modal.event_index].description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.props.eventsActions.showEventModal({state:false,event_index:null})}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
  }

  render() {
    debugger;
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
  show_event_modal: PropTypes.object,
  events: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    show_event_modal: state.show_event_modal,
    events:state.events
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