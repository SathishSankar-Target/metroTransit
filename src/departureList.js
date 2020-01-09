import React , { Component }from 'react';
import { connect } from 'react-redux';
import './App.css';
import {getMetro} from './duck/metroDuck'
import { showMoreClickAction } from './action/simpleAction';

class DepartureList extends Component {
  
  // onClick method to expand/colapse to show more/less departure list when the list length is more than 3
  showMoreDeparture = () => {
    if(this.props.departureCountToShow === 3 ){
	  this.props.showMoreClick({ departureCountToShow: this.props.departureList.Departures.length, departureExpanded: true })
    } else {
	  this.props.showMoreClick({ departureCountToShow: 3, departureExpanded: false })
    }
  }

  timeDiff = (departTime) => {
	  return ((new Date(departTime) - new Date()) < 5*60*1000)
  }

  render() {
	const { departureList, departureExpanded, departureCountToShow } = this.props
    return (
			<div className="departure-container">
				{ (departureList.Stop !== undefined && departureList.Departures !== undefined) ?
					<div>
						<div className="departure">
							<h2 className="departure-title">Departures</h2>
							<div className="stop-description">
								<div>{departureList.Stop.Description}</div>
								<div>Stop {departureList.Stop.StopId}</div>
							</div>
						</div>
						<div role='list'>
							{departureList.Departures.slice(0, departureCountToShow).map(departure => {
							return <div className="departure-list" key={departure.BlockNumber}>
									<div className="route-discription">
									<span className="route-id"><strong>{departure.RouteId}</strong></span>
									<span>{departure.Description}</span>
									</div>
									<div className="depart-time">
									{this.timeDiff(departure.DepartureTime) && <span className="blink"></span>}
										<strong>{departure.DepartureText}</strong>
									</div>
								</div>
							})}
						</div>
						{/* show more/less departure list button */}
						{ departureList.Departures.length > 3 && 
							<button className="show-more-button" onClick={this.showMoreDeparture}>
							<span className={departureExpanded ? 'expand': 'colapsed'}></span>
							Show {departureExpanded ? 'less' : 'more' } departure time
							</button>
						}
					</div>
					:
					// Error message in case of any api service fails or wrong data passed
					<div>We are unable to get the desired direction for your select, Kindly try chaning the option for the route, direction and stop</div>
				}
			</div>
		)
	}
}
        

export const mapStateToProps = state => {
	const metroData = getMetro(state)
	return {
	  departureList:metroData.departureData,
	  departureExpanded: metroData.departureExpanded,
	  departureCountToShow: metroData.departureCountToShow
   	}
}
  
export const mapDispatchToProps = dispatch => ({
	showMoreClick: (showMoreClickData) => dispatch(showMoreClickAction(showMoreClickData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepartureList);
