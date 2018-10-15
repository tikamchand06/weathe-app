import React, {Component} from 'react';
import Location from './location';

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-light bg-light shadow-sm">
				<div className="container">
					<span className="navbar-brand mb-0 h1">Weather App</span>
				
					<form className="form-inline my-2 my-lg-0">
						<Location onLocationChange={this.props.onLocationChange}/>
					</form>
				</div>
			</nav>
		);
	}
}

export default Navbar;