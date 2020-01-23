import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import TopNav from '../../components/top-nav';
import styles from 'styled-components';
import './index.scss';

const Spacer = styles.div`
  height: 80vh;
`;

class ContributionPage extends Component {
	render() {
		return (
			<React.Fragment>
				<TopNav />
        <h1>Contribution</h1>  
        <h2>Modern, Simple, Impactful way companies can give back to the Open Source Community</h2>
        <div>How does it work</div>
        <div>Who are you</div>
        <ul>
          <li>Company</li>
          <li>Maintainer</li>
          <li>Company Developer</li>
        </ul>
        <div className="company">
          <div>Create An Account</div>
          <div>Link Credit Card or Bank Account</div>
          <div>Send invites</div>
          <div className="maintainer">
            <div>Create An Account</div>
            <div><span>Choose a Repository</span>
              <div>Must Be a Colaborator or Maintainer on NPM and Github</div>
            </div>
            <div>Send Invites to Colaborators </div>
            <div>Link One or Mutliple Credit Card or Bank Accounts, maybe Venmo Accounts</div>
            <div>Add Extra Maintainer</div>
          </div>
           <div className="dev">
              <div></div>
            </div>
        </div>
			</React.Fragment>
		);
	}
}

export default ContributionPage;
