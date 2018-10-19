import React, {Component} from 'react';
import Loader from './loader';

class CurrentWeather extends Component {

	render () {
        const {RoundedValue, weatherData} = this.props;
        const {isLoading, current, location, iconUrl, updateTime} = weatherData;
        const {dewPoint, humidity, icon, pressure, summary, temperature, uvIndex, visibility, windDirection, windSpeed} = current;
        const weatherIcon = iconUrl + icon + '.png';
        
		return (
			<div className="weather-container">
                <div className="card">
                    <div className="card-body">
                        <div className="justify-content-between">
                            <h3 className="p-2 justify-content-between">
                                <span>{location.name}</span>
                                {updateTime && (
                                    <small className="last-updated"><b>Last Updated:</b> {updateTime}</small>
                                )}
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