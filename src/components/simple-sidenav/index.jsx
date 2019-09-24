import React from 'react';
import PropTypes from 'prop-types';

import { Sidebar } from 'react-rainbow-components/components';
import './index.scss';

class SelectedBorder extends React.Component {
	static propTypes = {
		navItemHeight: PropTypes.number.isRequired,
		pos: PropTypes.number.isRequired
	};

	render() {
		let { pos, navItemHeight } = this.props;

		const selectedBorderStyle = {
			transition: 'transform .15s',
			transform: `translateY(${pos * navItemHeight}px)`
		};

		return <div style={selectedBorderStyle} id="cs-sidenav_selected-border" />;
	}
}

class SimpleSideNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: 'Home',
			selectedPos: 0,
			itemHeight: 0
		};

		this.handleOnSelect = this.handleOnSelect.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.sideNavRef = new React.createRef();
	}

	componentDidMount() {
		if (this.sideNavRef.current !== null) {
			const itemElement = this.sideNavRef.current.querySelector('.rainbow-sidebar-item');
			const itemHeight = this.getElementTotalHeight(itemElement);

			console.log(itemHeight);

			this.setState((prevState) => {
				return {
					selectedItem: prevState.selectedItem,
					selectedPos: prevState.selectedPos,
					itemHeight
				};
			});
		} else {
			console.error('Ref is null');
		}
	}

	getElementTotalHeight(element) {
		let sum = 0;
		sum += parseInt(getComputedStyle(element).marginBottom);
		sum += parseInt(getComputedStyle(element).marginTop);
		sum += parseInt(getComputedStyle(element).height);

		return sum;
	}

	handleOnClick(e, index) {
		return this.setState((prevState) => {
			return {
				selectedItem: prevState.selectedItem,
				selectedPos: index,
				itemHeight: prevState.itemHeight
			};
		});
	}

	handleOnSelect(e, selectedItem) {
		this.setState((prevState) => {
			return {
				selectedItem,
				selectedPos: prevState.selectedPos,
				itemHeight: prevState.itemHeight
			};
		});
	}

	render() {
		const { selectedItem, selectedPos, itemHeight } = this.state;
		const children = React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, {
				onClick: (e) => {
					this.handleOnClick(e, index);
				}
			});
		});

		return (
			<div
				ref={this.sideNavRef}
				className="rainbow-background-color_white rainbow-p-top_small rainbow-p-bottom_medium cs-sidenav_wrapper"
			>
				<Sidebar selectedItem={selectedItem} onSelect={this.handleOnSelect}>
					{children}
					{<SelectedBorder pos={selectedPos} navItemHeight={itemHeight} />}
				</Sidebar>
			</div>
		);
	}
}

export default SimpleSideNav;
