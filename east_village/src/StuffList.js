import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from './actions/';
import PropTypes from 'prop-types';
import React from 'react';

import {Modal,OverlayTrigger,tooltip,Button} from 'react-bootstrap';

// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class eventsList extends React.Component { 
    
  componentWillMount() { 
       this.props.eventsActions.fetchEvents();
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
          
          <Modal show={true} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>


            

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
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
  event_count : PropTypes.number
};

function mapStateToProps(state) {
  return {
    events: state.events,
    event_count: state.events_count
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