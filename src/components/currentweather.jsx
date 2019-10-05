import React from 'react';
import { Segment, Header, Container, Image, List, Grid } from 'semantic-ui-react';
import { RoundedValue, getWeatherIcon, convertToDegree } from './helpers';

const CurrentWeather = ({ data }) => {
  const { isLoading, current, location, updateTime } = data;
  const currentDetails = [
    { title: 'Wind', value: `${current.windSpeed}m/s` },
    { title: 'Wind Direction', value: current.windDirection },
    { title: 'Humidity', value: `${(current.humidity * 100).toFixed(0)}%` },
    { title: 'Dew Point', value: RoundedValue(current.dewPoint) },
    { title: 'UV Index', value: RoundedValue(current.uvIndex) },
    { title: 'Visibility', value: `${RoundedValue(current.dewPoint)}km` },
    { title: 'Pressure', value: `${RoundedValue(current.dewPoint)}hPa` }
  ];

  return (
    <Segment style={{ minHeight: '30vh' }} loading={isLoading}>
      <Header as="h2">
        {location && <span>{location.name}</span>}
        <Header.Subheader>Last Updated: {updateTime}</Header.Subheader>
      </Header>
      <Container>
        <Grid>
          <Grid.Row verticalAlign="middle">
            <Grid.Column width="2">
              <Image src={getWeatherIcon(current.icon)} />
            </Grid.Column>
            <Grid.Column width="14">
              <Header as="h1">
                {convertToDegree(current.temperature)} {current.summary}
                <Header.Subheader>Feels like {convertToDegree(current.apparentTemperature)}</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <List bulleted horizontal>
          {currentDetails.map((item, key) => (
            <List.Item key={key}>
              <strong>{item.title}:</strong> {item.value}
            </List.Item>
          ))}
        </List>
      </Container>
    </Segment>
  );
};

export default CurrentWeather;
