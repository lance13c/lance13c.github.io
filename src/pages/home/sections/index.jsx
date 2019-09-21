import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import WelcomeSection from '../components/welcome-section';
import TopNav from '../../../components/top-nav';
import './index.scss';

class HomePage extends Component {
	render() {
		return (
			<React.Fragment>
				<TopNav />
				<Grid className="cs-home_wrapper" container direction="column" justify="center" alignItems="center">
					<WelcomeSection />
				</Grid>
			</React.Fragment>
		);
	}
}

export default HomePage;
