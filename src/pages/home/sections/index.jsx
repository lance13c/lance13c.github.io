import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHiking, faTools, faFlaskPotion } from '@fortawesome/pro-solid-svg-icons';
import { SidebarItem } from 'react-rainbow-components/components';
import SimpleSideNav from '../../../components/simple-sidenav';

import WelcomeSection from '../components/welcome-section';
import TopNav from '../../../components/top-nav';
import './index.scss';

class HomePage extends Component {
	render() {
		return (
			<React.Fragment>
				<TopNav />
				<SimpleSideNav>
					<SidebarItem icon={<FontAwesomeIcon icon={faHome} />} name="Home" label="Home" />
					<SidebarItem icon={<FontAwesomeIcon icon={faHiking} />} name="Career" label="Carrer" />
					<SidebarItem icon={<FontAwesomeIcon icon={faTools} />} name="Skills" label="Skills & Tools" />
					<SidebarItem icon={<FontAwesomeIcon icon={faFlaskPotion} />} name="Projects" label="Projects" />
				</SimpleSideNav>
				<Grid className="cs-home_wrapper" container direction="column" justify="center" alignItems="center">
					<WelcomeSection />
				</Grid>
			</React.Fragment>
		);
	}
}

export default HomePage;
