import React from 'react';
import { Segment, Header, Card, Image, List } from 'semantic-ui-react';
import { RoundedValue, TimeString, DayString, getWeatherIcon, convertToDegree } from './helpers';

const ForcastWeather = ({ data }) => {
  const { isLoading, forcast } = data;
  const dailyData = forcast.data || [];

  const OneDayInfo = ({ current }) => {
    const currentDetails = [
      { title: 'Sun Rise', value: TimeString(current.sunriseDateTime) },
      { title: 'Sun Set', value: TimeString(current.sunsetDateTime) },
      { title: 'Wind', value: `${current.windSpeed}m/s` },
      { title: 'Wind Direction', value: current.windDirection },
      { title: 'Humidity', value: `${(current.humidity * 100).toFixed(0)}%` },
      { title: 'Dew Point', value: RoundedValue(current.dewPoint) },
      { title: 'UV Index', value: RoundedValue(current.uvIndex) },
      { title: 'Visibility', value: `${RoundedValue(current.dewPoint)}km` },
      { title: 'Pressure', value: `${RoundedValue(current.dewPoint)}hPa` }
    ];

    return (
      <List>
        {currentDetails.map((item, key) => (
          <List.Item key={key}>
            <strong>{item.title}:</strong>
            <span>{item.value}</span>
          </List.Item>
        ))}
      </List>
    );
  };

  return (
    <Segment loading={isLoading} style={{ minHeight: '50vh' }}>
      <Header as="h3">Forcast Weather (Next 7 Days)</Header>
      <Card.Group itemsPerRow={4}>
        {dailyData.map((current, key) => (
          <Card key={key}>
            <Card.Content>
              <Card.Header>
                {current.dateTime && DayString(current.dateTime)}
                <small style={{ float: 'right' }}>{current.dateTime && current.dateTime.format('Do MMM, YYYY')}</small>
              </Card.Header>
              <Card.Meta>
                <Image src={getWeatherIcon(current.icon)} size="tiny" inline />
                <span style={{ fontSize: '2rem' }}>
                  {convertToDegree(current.temperatureMax)}/{convertToDegree(current.temperatureMin)}
                </span>
                <p>{current.summary}</p>
              </Card.Meta>
              <Card.Description>
                <OneDayInfo current={current} />
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Segment>
  );
};

export default ForcastWeather;
