import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import {Modal,Button} from 'react-bootstrap';


// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class eventsDetails extends React.Component { 
    
  componentWillMount() { 
    //    this.props.eventsActions.fetchEvents();
  }
   
  render() {
    return (
       <div>
          
          <Modal show={this.props.show_event_modal} onHide={()=>this.props.eventsActions.showEventModal(false)}>
          < Modal.Header closeButton >
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.props.eventsActions.showEventModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

          
          </div>
    );
  }
}

eventsDetails.propTypes = {
  eventsActions: PropTypes.object,
  show_event_modal: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    show_event_modal: state.show_event_modal
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
)(eventsDetails);