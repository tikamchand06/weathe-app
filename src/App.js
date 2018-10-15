import React, { Component } from 'react';
import Navbar from './components/navbar';
import CurrenttWeather from './components/currentweather';
import ForcastWeather from './components/forcastweather';
import DarkSkyApi from 'dark-sky-api';

DarkSkyApi.apiKey = 'a5286027434a709d97e1418ff5729e34';
DarkSkyApi.units = 'si';
DarkSkyApi.extendHourly(true);

class App extends Component {
    state = {
        location: ''
    };

    onLocationChange = (latlng) => {
        console.log(latlng);
        this.setState({location: latlng});
    }

    RoundedValue(value){
        return Math.round(value);
    }

    render() {
        const iconUrl = 'https://darksky.net/images/weather-icons/';

        return (
            <React.Fragment>
                <Navbar onLocationChange={this.onLocationChange}/>
                <main className="container">
                    <CurrenttWeather DarkSkyApi={DarkSkyApi} iconUrl={iconUrl} RoundedValue={this.RoundedValue} location={this.state.location}/>
                    <ForcastWeather DarkSkyApi={DarkSkyApi} iconUrl={iconUrl} RoundedValue={this.RoundedValue} location={this.state.location}/>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
