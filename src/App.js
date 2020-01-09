import React , { Component }from 'react';
import { connect } from 'react-redux';
import { onLoadRouteAction, routeChangeAction, directionChangeAction, stopChangeAction } from './action/simpleAction';
import {getMetro, getRouteData} from './duck/metroDuck'
import './App.css';
import {fetchApi} from './apiCalls'
import DepartureList from './departureList'

class App extends Component {
  constructor(props) {
    super(props)
    this.updateDepartureData = this.updateDepartureData.bind(this)
    this.state = {
      routes : [],
      selectedRoute: '',
      direction: [],
      selectedDirection: '',
      stop: [],
      selectedStop: '',
      showDirection: false,
      showStop: false,
      departureList: [],
      showDepartureList: false,
      showRouteSelection: true,
      showStopSelection: false
    }
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
    if(this.state.selectedRoute !== '' && this.state.selectedDirection !== '' && this.state.selectedStop !== '') {
      const query = this.state.selectedRoute+'/'+this.state.selectedDirection+'/'+this.state.selectedStop
      fetchApi(query).then(departureList => this.setState({departureList: departureList}))
    }
  }

  // Makes the call to get the direction select box data and set/change some default state values
  handleRoutChange = (event) => {
    let value = event.target.value
    this.setState({
      showDirection: false,
      direction: [],
      selectedRoute:'',
      showStop: false,
      departureList: [],
      showDepartureList: false,
    })
    this.props.directionData({
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
        this.props.directionData({direction :direction, showDirection: true, selectedRoute: value })
        this.setState({direction :direction, showDirection: true, selectedRoute: value })
      })
    } 
  }

  // Makes the call to get the stop select box data and set/change some default state values
  handleDirectionChange = (event) => {
    let value = event.target.value
    this.setState({
      showStop: false,
      stop: [],
      selectedDirection: '',
      departureList: [],
      showDepartureList: false,
    })
    this.props.stopData({
      showStop: false,
      stop: [],
      selectedDirection: '',
      departureList: [],
      showDepartureList: false,
    })
    if (value !== 'Select direction') {
      fetchApi('stops/'+this.state.selectedRoute+'/'+value)
      .then(stop => {
        this.props.stopData({stop :stop, showStop: true, selectedDirection: value })
        this.setState({stop :stop, showStop: true, selectedDirection: value })
      })
    } 
  }

  // Makes the call to get the list departure data and set/change some default state values
  handleStopChange = (event) => {
    let value = event.target.value
    this.setState({
      showDepartureList: false,
      departureList: []
    })
    this.props.departureData({departureList: [], showDepartureList: false})
    if (value !== 'Select stop') {
      fetchApi(this.state.selectedRoute+'/'+this.state.selectedDirection+'/'+value)
      .then(departureList => {
        this.props.departureData({departureList: departureList, showDepartureList: true, selectedStop: value})
        this.setState({departureList: departureList, showDepartureList: true, selectedStop: value})
      })
    } 
  }

  render() {
    const state = this.state
    const routeData = state.routes
    const directionData = state.direction
    const stopData = state.stop
    const departureList = state.departureList
    // const { routeData, directionData, stopData, departureList } = state
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
        { (state.showDirection && directionData) &&
          <select className="select-box" onChange={(e) => this.handleDirectionChange(e)}>
            <option>Select direction</option>
            { directionData.map(direction => <option key={direction.DirectionId} value={direction.DirectionId}>{direction.DirectionName}</option>)}
          </select>
        }
        {/* Select the stop select box */}
        { (state.showStop && stopData) &&
          <select className="select-box" onChange={(e) => this.handleStopChange(e)}>
            <option>Select stop</option>
            { stopData.map(stop => <option key={stop.PlaceCode} value={stop.PlaceCode}>{stop.Description}</option>)}
          </select>
        }
        </div>
        {/* Departure list along with the stop description and stop id */}
        { state.showDepartureList && <DepartureList departureList = {departureList} /> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(getMetro(state))
  return {
  ...state
 }
}

 const mapDispatchToProps = dispatch => ({
  onLoadRouteData: (routes) => dispatch(onLoadRouteAction(routes)),
  directionData: (directionData) => dispatch(routeChangeAction(directionData)),
  stopData: (stopData) => dispatch(directionChangeAction(stopData)),
  departureData: (departureData) => dispatch(stopChangeAction(departureData))
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
