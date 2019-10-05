import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from 'styled-components';
import SkillRating from '../../../../components/skill-rating';

const SkillsToolsHeader = styles.h3`
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const SkillsToolsSection = styles.div`
  display: grid;
  grid-template-columns: 30px 1fr 1fr 1fr 30px;
`;

const Column = styles.div`
  grid-column-start: ${(props) => props.col}

`;

class SkillsTools extends Component {
	state = { filter: null };
	render() {
		return (
			<SkillsToolsSection>
				<Column col={2}>
					<SkillsToolsHeader>Languages</SkillsToolsHeader>
					<SkillRating value={3} name="JavaScript" link="https://www.google.com" />
					<SkillRating value={3} name="JavaScript" />
					<SkillRating value={3} name="JavaScript" />
				</Column>
				<Column col={3}>
					<SkillsToolsHeader>Build Tools</SkillsToolsHeader>
				</Column>
				<Column col={4}>
					<SkillsToolsHeader>Frameworks</SkillsToolsHeader>
				</Column>
			</SkillsToolsSection>
		);
	}
}

export default SkillsTools;
