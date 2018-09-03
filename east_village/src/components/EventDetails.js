import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import LocationMarker from './LocationMarker'; 
import Moment from 'moment';


class EventDetailsModal extends React.Component {
  renderDistance(event) {
    return (
      <td>{event.user_distance.status !== "ZERO_RESULTS"?event.user_distance.distance.text:"No Direct Road Route"}</td>
    )
  }

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
        <Modal className="container"  show={this.props.show_event_modal} onHide={()=>this.props.eventsActions.showEventModal({state:false,event_index:null})}>
          <Modal.Header closeButton >
            <h2>{event.name}</h2>
          </Modal.Header>
          < Modal.Body>
              <div className="row">
                <div className="col-md-6">
                 <h4>Start Time:</h4> <p>{Moment(event.time_start).format('d MMM YYYY')}</p>
                </div>
                <div className="col-md-6">
                 <h4>Address:</h4> <p>{event.location.display_address}</p>
                </div>
                <div className="col-md-6">
                  <h4>Distance:</h4><p>{event.user_distance?this.renderDistance(event):"Your location is not available"}</p>
                </div>
                <div className="col-md-6">
                   <h4>Cost($):</h4><p>{event.is_free?"Free":(event.cost?event.cost:"Not Available")}</p>
                </div>
                <div className="col-md-12">
                   <h4>Description:</h4> <p>{event.description}</p>
                </div>
            </div>
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