import React , { Component }from 'react';
import './App.css';


class DepatureList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departureCountToShow: 3,
      depatureExpanded: false,
    }
  }
  
  // onClick method to expand/colapse to show more/less depature list when the list length is more than 3
  showMoreDepature = () => {
		console.log(this.state)
    if(this.state.departureCountToShow === 3 ){
      this.setState({ departureCountToShow: this.props.departureList.Departures.length, depatureExpanded: true })
    } else {
      this.setState({ departureCountToShow: 3, depatureExpanded: false })
    }
  }

  render() {
		const departureList = this.props.departureList
    return (
			<div className="depature-container">
				{ (departureList.Stop !== undefined && departureList.Departures !== undefined) ?
					<div>
						<div className="depature">
							<h2 className="depature-title">Departures</h2>
							<div className="stop-description">
								<div>{departureList.Stop.Description}</div>
								<div>Stop {departureList.Stop.StopId}</div>
							</div>
						</div>
						<div role='list'>
							{departureList.Departures.slice(0, this.state.departureCountToShow).map(depature => {
							return <div className="depature-list" key={depature.BlockNumber}>
									<div className="route-discription">
									<span className="route-id"><strong>{depature.RouteId}</strong></span>
									<span>{depature.Description}</span>
									</div>
									<div className="depart-time">
									{depature.DepartureText <= '5  Min' && <span className="blink"></span>}
										<strong>{depature.DepartureText}</strong>
									</div>
								</div>
							})}
						</div>
						{/* show more/less depature list button */}
						{ departureList.Departures.length > 3 && 
							<button className="show-more-button" onClick={this.showMoreDepature}>
							<span className={this.state.depatureExpanded ? 'expand': 'colapsed'}></span>
							Show {this.state.depatureExpanded ? 'less' : 'more' } depature time
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
        

export default DepatureList
