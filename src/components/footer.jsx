import React, {Component} from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="container p-3">
				&copy; {new Date().getFullYear()} Weather App. All Right Reserved.
			</footer>
		);
	}
}

export default Footer;