import React, { Component } from 'react';
import PropType from 'prop-types';
import styled from 'style-components';

import './index.scss';

const iconMap = new Map([ [ 'solid', 'fas' ], [ 'regular', 'far' ], [ 'brand', 'fab' ] ]);

const Icon = styled.icon``;

class HomePage extends Component {
	static PropType = {
		icons: PropType.arrayOf(
			PropType.shape({
				link: PropType.string,
				color: PropType.string,
				name: PropType.name,
				style: PropType.string
			})
		).isRequired
	};

	render() {
		const { icons } = this.props;
		return (
			<span className="cs-icon-list">
				{icons.map((icon, i) => {
					return (
						<a key={`${icon.name}_${i}`} href={icon.link}>
							<i className={`${iconMap.get(icon.style)} fa-${icon.name}`} />
						</a>
					);
				})}
			</span>
		);
	}
}

export default HomePage;
