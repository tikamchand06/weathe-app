import React, {Component} from 'react';

class WeatherMap extends Component {

	render () {
        const {latitude, longitude} = this.props;
        // const scriptSrc = "https://darksky.net/map-embed/@temperature,"+ latitude +","+longitude +",4.js?embed=true&timeControl=true&fieldControl=true&defaultField=temperature&defaultUnits=_c";
        const iframeSrc = "https://maps.darksky.net/@temperature,"+ latitude +","+longitude +",4";
		return (
            <div className="card">
                <div className="card-header">
                    <h3>Weather Map</h3>
                </div>
                <div className="card-body">
                    {latitude && longitude && ( <iframe src={iframeSrc} className="WeatherMap" title="WeatherMap"/> )}
                </div>
            </div>
		);
	}
}

export default WeatherMap;