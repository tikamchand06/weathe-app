import React, {Component} from 'react';

class OneDayWeather extends Component {
    TimeString(date){
    	return date.format('LTS');
    }

    DayString(dateTime){
    	return dateTime.calendar(null, {
	        sameDay: '[Today]',
	        nextDay: 'dddd',
	        nextWeek: 'dddd',
	        lastDay: '[Yesterday]',
	        lastWeek: '[Last] dddd',
	        sameElse: 'dddd'
	    });
    }

	render () {
		const {data, iconUrl, RoundedValue} = this.props;
        const {dewPoint, humidity, icon, pressure, summary, temperatureMin, temperatureMax, dateTime, uvIndex, visibility, windDirection, windSpeed, sunriseDateTime, sunsetDateTime} = data;
        const weatherIcon = iconUrl + icon + '.png';

		return (
			<div className="card forcast-card">
				<div className="card-header">
					<h5 className="date-time">
						{dateTime && this.DayString(dateTime)}
						<small>{dateTime && dateTime.format('Do MMM, YYYY')}</small>
					</h5>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item text-center">
						<img src={weatherIcon} className="img-responsive weather-icon" alt="weather-icon"/>
						<span className="temperature">
							{RoundedValue(temperatureMax)}<sup>&deg;</sup>/{RoundedValue(temperatureMin)}<sup>&deg;</sup>
						</span>
					</li>
					<li className="list-group-item summary">{summary}</li>
					<li className="list-group-item"><b>Sun Rise:</b> {this.TimeString(sunriseDateTime)}</li>
					<li className="list-group-item"><b>Sun Set:</b> {this.TimeString(sunsetDateTime)}</li>
					<li className="list-group-item"><b>Wind:</b> {windSpeed}m/s</li>
					<li className="list-group-item"><b>Wind Direction:</b> {windDirection}</li>
					<li className="list-group-item"><b>Humidity:</b> {(humidity*100).toFixed(0)}%</li>
					<li className="list-group-item"><b>Dew Pt:</b> {RoundedValue(dewPoint)}</li>
					<li className="list-group-item"><b>UV Index:</b> {RoundedValue(uvIndex)}</li>
					<li className="list-group-item"><b>Visibility:</b> {RoundedValue(visibility)} km</li>
					<li className="list-group-item"><b>Pressure:</b> {RoundedValue(pressure)} hPa</li>
				</ul>
			</div>
		);
	}
}

export default OneDayWeather;