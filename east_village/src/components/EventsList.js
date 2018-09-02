import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import {Modal,Button} from 'react-bootstrap';

import EventDetailsModal from './EventDetails';

class eventsList extends React.Component { 
    
  componentWillMount() { 
       this.props.eventsActions.fetchEvents();
  }
  
  handleModalClose() {
     debugger;
     this.props.eventsActions.showEventModal(false);
  }
  renderData() {
   
    return ( 
        <div>
          Total Events :{this.props.event_count}
          <table className="table  table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Time</th>
                <th scope = "col">Location</th>
                <th scope="col">Distance(miles)</th>
                <th scope = "col" >Cost</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.events.map((event,index) => ( 
                  <tr key="{index}">
                    <td>{index+1}</td>
                    <td>{event.name}</td>
                    <td>{event.time_start}</td>
                    <td>{event.location.display_address[0]}</td>
                    <td>{event.user_distance?event.user_distance.distance.text:"-"}</td>
                    <td>{event.cost?event.cost:"Not Available"}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          < EventDetailsModal/>
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
  
  render() {
    return (
      <div className="">
          {
            this.props.events.length > 0 ?
            this.renderData()
            :
            <div className="">
              No Data
            </div>
          }
      </div>
    );
  }
}

eventsList.propTypes = {
  eventsActions: PropTypes.object,
  events: PropTypes.array,
  event_count : PropTypes.number,
  show_event_modal: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    events: state.events,
    event_count: state.events_count,
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
)(eventsList);