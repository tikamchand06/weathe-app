import React, {Component} from 'react';
import Loader from './loader';
import WeatherMap from './weathermap';
import OneDayWeather from './OneDayWeather'

class ForcastWeather extends Component {
	state = {
        isLoading: true,
        forcast: {},
        dailyData: [],
        updateTime: null
    }

    componentDidMount() {
        this.props.DarkSkyApi.loadForecast().then(result => {
            console.log('forcast:', result.daily);
            this.setState({
                isLoading: false,
                forcast: result,
                dailyData: result.daily.data,
                updateTime: result.daily.updatedDateTime
            })
        });
    }

	render () {
        const {isLoading, forcast, dailyData, updateTime} = this.state;
        const {RoundedValue} = this.props;

		return (
            <div>
    			<div className="weather-container">
    				<h3>Forcast Weather (Next 7 Days)
                        { updateTime && (
                            <small className="last-updated"><b>Last Updated:</b> {updateTime.format('Do MMM, YYYY h:mm:ss A')}</small>
                        )}
                    </h3>
                    <div className="d-flex forcast-weather p-1">
                        {!isLoading && dailyData.map((data, index) =>
                            <OneDayWeather
                                data={data}
                                key={index}
                                RoundedValue={RoundedValue}
                                iconUrl={this.props.iconUrl}
                            />
                        )}
                    </div>

                    {isLoading && (<Loader />)}
    			</div>
                <div className="weather-container">
                    <WeatherMap latitude={forcast.latitude} longitude={forcast.longitude}/>
                </div>
            </div>
		);
	}
}

export default ForcastWeather;