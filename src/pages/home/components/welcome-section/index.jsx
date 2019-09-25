import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';

class WelcomeSection extends Component {
	render() {
		return (
			<div className="cs-welcome_wrapper">
				<div className="cs-welcome_text">
					<h1>Dominic Cicilio</h1>
					<div className="cs-welcome_sub-header_wrapper">
						<a href="/#" className="cs-welcome_sub-header">
							Developer
						</a>
						<FontAwesomeIcon size="xs" icon={faCircle} />
						<a href="/#" className="cs-welcome_sub-header">
							Creativity
						</a>
						<FontAwesomeIcon size="xs" icon={faCircle} />
						<a href="/#" className="cs-welcome_sub-header">
							Projects
						</a>
					</div>
				</div>
				<div className="cs-home_image_wrapper">
					<img
						alt="Dominic launching his 8 foot tall trebuchet."
						src="https://res.cloudinary.com/lance13c/image/upload/q_auto:eco/Trebuchet/trebuchet_0.jpg"
					/>
				</div>
			</div>
		);
	}
}

export default WelcomeSection;
