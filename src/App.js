import React , { Component }from 'react';
import './App.css';
import {fetchApi} from './apiCalls'
import DepatureList from './depatureList'

class App extends Component {
  constructor(props) {
    super(props)
    this.updateDepatureData = this.updateDepatureData.bind(this)
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
    fetchApi('routes').then(routes => this.setState({routes :routes }))
    setInterval(this.updateDepatureData, 60000)
  }
  // Makes the call every 1 min only when there is selectedRoute, selectedDirection, selectedStop
  async updateDepatureData() {
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
    if (value !== 'Select route') {
      fetchApi('directions/'+value)
      .then(direction => this.setState({direction :direction, showDirection: true, selectedRoute: value }))
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
    if (value !== 'Select direction') {
      fetchApi('stops/'+this.state.selectedRoute+'/'+value)
      .then(direction => this.setState({stop :direction, showStop: true, selectedDirection: value }))
    } 
  }

  // Makes the call to get the list depature data and set/change some default state values
  handleStopChange = (event) => {
    let value = event.target.value
    this.setState({
      showDepartureList: false,
      departureList: []
    })
    if (value !== 'Select stop') {
      fetchApi(this.state.selectedRoute+'/'+this.state.selectedDirection+'/'+value)
      .then(departureList => this.setState({departureList: departureList, showDepartureList: true, selectedStop: value}))
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
        {/* Depature list along with the stop description and stop id */}
        { state.showDepartureList && <DepatureList departureList = {departureList} /> }
      </div>
    );
  }
}

export default App;
