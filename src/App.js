import React, { Component } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Search from './components/search';
import CurrenttWeather from './components/currentweather';
import ForcastWeather from './components/forcastweather';
import DarkSkyApi from 'dark-sky-api';

DarkSkyApi.apiKey = 'a5286027434a709d97e1418ff5729e34';
DarkSkyApi.units = 'si';
DarkSkyApi.extendHourly(true);

class App extends Component {
    state = {
        isLoading: true,
        location: {
            name: 'NA',
            latLng: {
                lat: '',
                lng: ''
            },
            timezone: ''
        },
        current: {},
        forcast: {},
        hourly: {},
        updateTime: '',
        iconUrl: 'https://darksky.net/images/weather-icons/'
    };

    getWeatherData(pos = undefined) {
        if(pos) {
            const position = {
                latitude: pos.latLng.lat,
                longitude: pos.latLng.lng
            };

            DarkSkyApi.loadCurrent(position).then(result => console.log(result));
            DarkSkyApi.loadItAll(position).then(result => {

                var newLocationState = {
                    name: pos.name,
                    latLng: {
                        lat: result.latitude,
                        lng: result.longitude
                    },
                    timezone: result.timezone
                };

                this.setState({
                    isLoading: false,
                    location: newLocationState,
                    current: result.currently,
                    forcast: result.daily,
                    hourly: result.hourly,
                    updateTime: result.updatedDateTime.format('Do MMM, YYYY h:mm:ss A')
                })
            });
        }
    }

    onLocationChange = (latLng) => {
        this.getWeatherData(latLng);
    }

    RoundedValue(value){
        return Math.round(value);
    }

    render() {

        return (
            <React.Fragment>
                <Navbar onLocationChange={this.onLocationChange}/>
                <main className="container">
                    <CurrenttWeather RoundedValue={this.RoundedValue} weatherData={this.state}/>
                    <ForcastWeather RoundedValue={this.RoundedValue} weatherData={this.state}/>
                </main>
                <Footer/>
                {this.state.location.name === 'NA' && (<Search onLocationChange={this.onLocationChange}/>)}
            </React.Fragment>
        );
    }
}

export default App;
