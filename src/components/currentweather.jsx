import React, {Component} from 'react';
import Loader from './loader';

class CurrentWeather extends Component {
	state = {
        isLoading: true,
        iconUrl: this.props.iconUrl,
        current: {},
        location: this.props.location
    }

    componentDidMount() {
        this.props.DarkSkyApi.loadCurrent().then(result => {
            this.setState({
                isLoading: false,
                current: result,
                location: this.props.location
            })
        });
    }

	render () {
        const {iconUrl, isLoading, location} = this.state;
        const {locationName, latlng} = this.state.location;
        const {dewPoint, humidity, icon, pressure, summary, temperature, dateTime, uvIndex, visibility, windDirection, windSpeed} = this.state.current;
        const weatherIcon = iconUrl + icon + '.png';
        const {RoundedValue} = this.props;
        console.log(locationName, latlng, this.props);
		return (
			<div className="weather-container">
                <div className="card">
                    <div className="card-body">
                        <div className="justify-content-between">
                            <h3 className="p-2 justify-content-between">
                                <span>{locationName}</span>
                                <small className="current-time">{dateTime && dateTime.format('Do MMM, YYYY h:mm:ss A')}</small>
                            </h3>
                            {!isLoading && (
                                <div>
                                <h2 className="p-2">
                                    <img src={weatherIcon} className="img-responsive weather-icon" alt="weather-icon"/>
                                    <span className="temperature p-2">{RoundedValue(temperature)}<sup>&deg;</sup></span>
                                    <span className="summary">{summary}</span>
                                </h2>

                                <div className="p-2">
                                    <span className="misc-info"><b>Wind:</b> {windSpeed}m/s</span>
                                    <span className="misc-info"><b>Wind Direction:</b> {windDirection}</span>
                                    <span className="misc-info"><b>Humidity:</b> {(humidity*100).toFixed(0)}%</span>
                                    <span className="misc-info"><b>Dew Pt:</b> {RoundedValue(dewPoint)}</span>
                                    <span className="misc-info"><b>UV Index:</b> {RoundedValue(uvIndex)}</span>
                                    <span className="misc-info"><b>Visibility:</b> {RoundedValue(visibility)} km</span>
                                    <span className="misc-info"><b>Pressure:</b> {RoundedValue(pressure)} hPa</span>
                                </div>
                                </div>
                            )}
                            {isLoading && (<Loader />)}
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

export default CurrentWeather;