export const getWeatherIcon = icon => `https://darksky.net/images/weather-icons/${icon}.png`;

export const RoundedValue = value => Math.round(value);

export const TimeString = date => date.format('LTS');

export const DayString = dateTime => {
  return dateTime.calendar(null, {
    sameDay: '[Today]',
    nextDay: 'dddd',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'dddd'
  });
};

export const convertToDegree = value => `${RoundedValue(value)}\u00B0`;
