import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';

class WelcomeSection extends Component {
	render() {
		return (
			<section className="cs-welcome_wrapper">
				<h1>Dominic Cicilio</h1>
				<Grid
					className="cs-welcome_sub-header_wrapper"
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
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
				</Grid>
			</section>
		);
	}
}

export default WelcomeSection;
