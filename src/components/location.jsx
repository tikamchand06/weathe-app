import React, { useState } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const Location = ({ onLocationChange }) => {
  const [address, updateAddress] = useState('');

  const handleSelect = address => {
    updateAddress(address);

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => onLocationChange({ name: address, latLng: latLng }))
      .catch(error => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete value={address} onChange={updateAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Input loading={loading} placeholder="Search..." icon="search" {...getInputProps()} />
          <Dropdown icon="" open={suggestions.length ? true : false}>
            <Dropdown.Menu>
              {suggestions.map(suggestion => (
                <Dropdown.Item active={suggestion.active} {...getSuggestionItemProps(suggestion)} text={suggestion.description} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default Location;
