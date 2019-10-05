import React, { useState, useEffect } from 'react';
import { Container, Embed, Segment } from 'semantic-ui-react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import CurrenttWeather from './components/currentweather';
import ForcastWeather from './components/forcastweather';
import DarkSkyApi from 'dark-sky-api';

DarkSkyApi.apiKey = process.env.REACT_APP_DARKSKY_API_KEY;
DarkSkyApi.units = 'si';
DarkSkyApi.extendHourly(true);

const App = () => {
  const [state, setState] = useState({
    isLoading: true,
    location: null,
    current: {},
    forcast: {},
    hourly: {}
  });

  // Get UserLocation via IP
  const getUserLocation = async () => {
    let location;
    if (localStorage.location) {
      location = JSON.parse(localStorage.location);
    } else {
      const userLocation = await fetch(`https://ipinfo.io?token=${process.env.REACT_APP_IPINFO_TOKEN}`).then(res => res.json());
      const latLng = userLocation.loc.split(',');
      location = {
        ...userLocation,
        name: `${userLocation.city}, ${userLocation.region}`,
        latLng: { lat: latLng[0], lng: latLng[1] }
      };

      localStorage.location = JSON.stringify(location);
    }

    setState({ ...state, location });
    getWeatherData(location);
  };

  // Get Weather Details
  const getWeatherData = (pos = null) => {
    if (pos) {
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

        setState({
          ...state,
          isLoading: false,
          location: newLocationState,
          current: result.currently,
          forcast: result.daily,
          hourly: result.hourly,
          updateTime: result.updatedDateTime.format('Do MMM, YYYY h:mm:ss A')
        });
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <Container fluid className="main-container">
      <Navbar onLocationChange={getWeatherData} />
      <Container>
        <CurrenttWeather data={state} />
        <ForcastWeather data={state} />
        {state.location && (
          <Segment
            content={
              <Embed
                url={`https://maps.darksky.net/@temperature,${state.location.latLng.lat},${state.location.latLng.lng},4`}
                active
              />
            }
          />
        )}
      </Container>
      <Footer />
    </Container>
  );
};

export default App;
