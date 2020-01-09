import React , { Component }from 'react';
import { connect } from 'react-redux';
import { onLoadRouteAction, routeChangeAction, directionChangeAction, stopChangeAction } from './action/simpleAction';
import {getMetro} from './duck/metroDuck'
import './App.css';
import {fetchApi} from './apiCalls'
import DepartureList from './departureList'

class App extends Component {
  constructor(props) {
    super(props)
    this.updateDepartureData = this.updateDepartureData.bind(this)
  }

  componentDidMount() {
    fetchApi('routes').then(routes => {
      this.props.onLoadRouteData(routes)
      this.setState({routes :routes })
    } )
    setInterval(this.updateDepartureData, 60000)
  }
  // Makes the call every 1 min only when there is selectedRoute, selectedDirection, selectedStop
  async updateDepartureData() {
    if(this.props.selectedRoute !== '' && this.props.selectedDirection !== '' && this.props.selectedStop !== '') {
      const query = this.props.selectedRoute+'/'+this.props.selectedDirection+'/'+this.props.selectedStop
      fetchApi(query).then(departureList => this.setState({departureList: departureList}))
    }
  }

  // Makes the call to get the direction select box data and set/change some default state values
  handleRoutChange = (event) => {
    let value = event.target.value
    this.props.routeChangeAction({
      showDirection: false,
      direction: [],
      selectedRoute:'',
      stop:[],
      showStop: false,
      departureList: [],
      showDepartureList: false,
    })
    if (value !== 'Select route') {
      fetchApi('directions/'+value)
      .then(direction => {
        this.props.routeChangeAction({direction :direction, showDirection: true, selectedRoute: value })
      })
    } 
  }

  // Makes the call to get the stop select box data and set/change some default state values
  handleDirectionChange = (event) => {
    let value = event.target.value
    this.props.directionChangeAction({
      showStop: false,
      stop: [],
      selectedDirection: '',
      departureList: [],
      showDepartureList: false,
    })
    if (value !== 'Select direction') {
      fetchApi('stops/'+this.props.selectedRoute+'/'+value)
      .then(stop => {
        this.props.directionChangeAction({stop :stop, showStop: true, selectedDirection: value })
      })
    } 
  }

  // Makes the call to get the list departure data and set/change some default state values
  handleStopChange = (event) => {
    let value = event.target.value
    this.props.stopChangeAction({departureList: [], showDepartureList: false})
    if (value !== 'Select stop') {
      fetchApi(this.props.selectedRoute+'/'+this.props.selectedDirection+'/'+value)
      .then(departureList => {
        this.props.stopChangeAction({departureList: departureList, showDepartureList: true, selectedStop: value})
      })
    } 
  }

  render() {
    const { routeData, directionData, stopData, showDepartureList, departureList, showStop, showDirection } = this.props
    return (
      <div className="App">
        <h2 className="page-title">Real-time Departures</h2>
        <div className="select-box-container">
        {/* Select the route select box */}
        { routeData && 
          <select className="select-box" onChange={(e) => this.handleRoutChange(e)}>
            <option>Select route</option>
            { routeData.map(route => <option key={route.RouteId} value={route.RouteId}>{route.Description}</option>)}
          </select> }
        {/* Select the direction select box */}
        { (showDirection && directionData) &&
          <select className="select-box" onChange={(e) => this.handleDirectionChange(e)}>
            <option>Select direction</option>
            { directionData.map(direction => <option key={direction.DirectionId} value={direction.DirectionId}>{direction.DirectionName}</option>)}
          </select>
        }
        {/* Select the stop select box */}
        { (showStop && stopData) &&
          <select className="select-box" onChange={(e) => this.handleStopChange(e)}>
            <option>Select stop</option>
            { stopData.map(stop => <option key={stop.PlaceCode} value={stop.PlaceCode}>{stop.Description}</option>)}
          </select>
        }
        </div>
        {/* Departure list along with the stop description and stop id */}
        { showDepartureList && <DepartureList /> }
      </div>
    );
  }
}

export const mapStateToProps = state => {
  const metroData = getMetro(state)
  return {
    routeData: metroData.routeData,
    directionData: metroData.directionData,
    stopData: metroData.stopData,
    showDepartureList: metroData.showDepartureList,
    departureList:metroData.departureData,
    showStop: metroData.showStop,
    showDirection: metroData.showDirection,
    selectedRoute: metroData.selectedRoute,
    selectedDirection: metroData.selectedDirection,
    selectedStop: metroData.selectedStop,
    showRouteSelection: metroData.showRouteSelection
 }
}

export const mapDispatchToProps = dispatch => ({
  onLoadRouteData: (routes) => dispatch(onLoadRouteAction(routes)),
  routeChangeAction: (directionData) => dispatch(routeChangeAction(directionData)),
  directionChangeAction: (stopData) => dispatch(directionChangeAction(stopData)),
  stopChangeAction: (departureData) => dispatch(stopChangeAction(departureData))
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
