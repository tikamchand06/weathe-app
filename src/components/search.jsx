import React, {Component} from 'react';
import Location from './location';

class Search extends Component {
	render() {
		return (
			<div className="modal fade show" id="search-modal" tabIndex="-1" role="dialog">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header text-center">
							<h5 className="modal-title">Search Location</h5>
						</div>
						<div className="modal-body">
							<form className="form-inline">
								<Location onLocationChange={this.props.onLocationChange}/>
							</form>
						</div>
						<div className="modal-footer">
							<p className="muted m-0">Please serch your location to get the weather result.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Search;