import React from 'react';
import './index.scss';

import Grid from '@material-ui/core/Grid';

import { ButtonIcon } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const TopNav = () => {
	return (
		<div className="cs-top-nav_wrapper">
			<Grid container direction="row" justify="flex-end" alignItems="center">
				<div className="rainbow-p-vertical_large rainbow-p-left_x-large rainbow-flex rainbow-align_center">
					<div className="rainbow-p-right_large">
						<ButtonIcon size="large" icon={<FontAwesomeIcon icon={faGithub} />} />
					</div>
					<div className="rainbow-p-right_large">
						<ButtonIcon size="large" icon={<FontAwesomeIcon icon={faLinkedin} />} />
					</div>
				</div>
			</Grid>
		</div>
	);
};

export default TopNav;
