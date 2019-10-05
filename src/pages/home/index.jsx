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
				<Grid container direction="row" justify="left" alignItems="left">
					<Grid item xs={1}>
						<SimpleSideNav>
							<SidebarItem icon={<FontAwesomeIcon icon={faHome} />} name="Home" label="Home" />
							<SidebarItem icon={<FontAwesomeIcon icon={faHiking} />} name="Career" label="Carrer" />
							<SidebarItem
								icon={<FontAwesomeIcon icon={faTools} />}
								name="Skills"
								label="Skills & Tools"
							/>
							<SidebarItem
								icon={<FontAwesomeIcon icon={faFlaskPotion} />}
								name="Projects"
								label="Projects"
							/>
						</SimpleSideNav>
					</Grid>
					<Grid item xs={11}>
						{/* <WelcomeSection /> */}
						<CSPiano />
						<Spacer />
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export default HomePage;
