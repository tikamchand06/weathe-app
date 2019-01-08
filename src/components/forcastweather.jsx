import React, {Component} from 'react';
import Loader from './loader';
import WeatherMap from './weathermap';
import OneDayWeather from './OneDayWeather'

class ForcastWeather extends Component {
	render () {
        const {RoundedValue, weatherData} = this.props;
        const {isLoading, forcast, location, iconUrl} = weatherData;
        const dailyData = forcast.data || [];

		return (
            <div>
    			<div className="weather-container">
    				<h3>Forcast Weather (Next 7 Days)</h3>
                    <div className="d-flex forcast-weather tcm-scroll p-1">
                        {!isLoading && dailyData.map((data, index) =>
                            <OneDayWeather
                                data={data}
                                key={index}
                                RoundedValue={RoundedValue}
                                iconUrl={iconUrl}
                            />
                        )}
                    </div>

                    {isLoading && (<Loader />)}
    			</div>
                <div className="weather-container">
                    <WeatherMap isLoading={isLoading} latitude={location.latLng.lat} longitude={location.latLng.lng}/>
                </div>
            </div>
		);
	}
}

export default ForcastWeather;