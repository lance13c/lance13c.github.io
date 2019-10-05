import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import './index.scss';

// const FancyLink

const SkillRating = (props) => {
	const { name, link, value } = props;

	return (
		<div className="cs-skill-rating">
			<a href={link} className="cs-skill-rating_content">
				<p>{name}</p>
				<Rating readOnly value={value} size="small" />
			</a>
		</div>
	);
};

export default SkillRating;
