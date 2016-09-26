import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadBest, loadNearby } from '../actions/cleaners';

class CleanersList extends React.Component {

	loadBest = () => (event) => {
		event.preventDefault();
		// load cleaners from the database
		this.props.loadBest();
	}

	loadNearby = () => (event) => {
		event.preventDefault();
		// load cleaners from the database
		this.props.loadBest();
	}

	render() {
		const cleaners = this.props.cleaners;
		const loadCleaners = this.loadCleaners;

		return (<div className="cleaners-list">
			<a onClick={this.loadNearby()}>Cleaners Nearby</a><br/>
			<a onClick={this.loadBest()}>Best Cleaners</a>
			{this.props.cleaners.map(cleaner => {
				return <p>cleaner.name</p>;
			})}

		</div>);
	}

}
CleanersList.propTypes = {
	cleaners: PropTypes.arrayOf(PropTypes.shape({
		rating: PropTypes.number.isRequired,
		name: PropTypes.string
	}))
};

function mapStateToProps(state) {
	return {
		cleaners: state.cleaners.payload
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadBest: () => {
			dispatch(loadBest());
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CleanersList);
