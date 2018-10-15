import React, {Component} from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Loader from './loader';

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            const location = {
                name: address,
                latLng: latLng
            };
            this.props.onLocationChange(location)
        })
        .catch(error => console.error('Error', error));
    };
 
    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({placeholder: 'Search Places ...', className: 'form-control mr-sm-2 location-search-input'})}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <Loader />}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                            return (
                                <div {...getSuggestionItemProps(suggestion, {className})}>
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
        );
    }
}

export default Location;