import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../actions/';
import PropTypes from 'prop-types';
import React from 'react';
import '../App.css';
import Moment from 'moment';

import EventDetailsModal from './EventDetails';

class eventsList extends React.Component { 
    
  componentWillMount() { 
       this.props.eventsActions.fetchUserLocation();
  }
  renderDistance(event) {
    return (
      <td>{event.user_distance.status !== "ZERO_RESULTS"?event.user_distance.distance.text:"No Direct Road Route"}</td>
    )
  }
  renderData() {
    return ( 
        <div>
          Total Events :{this.props.event_count}
          <div className="table-responsive ">
            <table className="table  table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Time</th>
                    <th scope="col">Location</th>
                    <th scope="col">Distance(miles)</th>
                    <th scope="col">Cost($)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.events.map((event,index) => (
                      <tr onClick={()=>this.props.eventsActions.showEventModal({state:true,event_index:index})} key="{index}">
                        <td>{index+1}</td>
                        <td>{event.name}</td>
                        <td>{Moment(event.time_start).format('d MMM YYYY')}</td>
                        <td>{event.location.display_address[0]}</td>
                        {event.user_distance?this.renderDistance(event):<td>-</td>}
                        <td>{event.is_free?"Free":(event.cost?event.cost:"Not Available")}</td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
          </div>
          <EventDetailsModal/>          
        </div>
      );
  }
  
  render() {
    return (
      <div className="">
          {
            this.props.events.length>0?this.renderData():<div className="loader"></div>
          }
      </div>
    );
  }
}

eventsList.propTypes = {
  eventsActions: PropTypes.object,
  events: PropTypes.array,
  event_count : PropTypes.number,
};

function mapStateToProps(state) {
  return {
    events: state.events,
    event_count: state.events_count,
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