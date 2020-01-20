import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHiking, faTools, faFlaskPotion } from '@fortawesome/pro-solid-svg-icons';
import { SidebarItem } from 'react-rainbow-components/components';
import SimpleSideNav from '../../components/simple-sidenav';

import WelcomeSection from './components/welcome-section';
import TopNav from '../../components/top-nav';
import styles from 'styled-components';
import SkillsTools from './sections/skills-tools';
import CSPiano from '../../components/cs-piano';
import './index.scss';

const Spacer = styles.div`
  height: 80vh;
`;

class HomePage extends Component {
	render() {
		return (
			<React.Fragment>
				<TopNav />
			</React.Fragment>
		);
	}
}

export default HomePage;
