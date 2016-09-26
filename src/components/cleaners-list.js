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
		this.props.loadNearby();
	}

	render() {
		const cleaners = this.props.cleaners;
		const loadBest = this.loadBest;
		const loadNearby = this.loadNearby;

		return (<div className="cleaners-list">
			<a onClick={loadNearby()}>Cleaners Nearby</a><br/>
			<a onClick={loadBest()}>Best Cleaners</a>
			{<p>{JSON.stringify(cleaners)}</p>}

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
		},
		loadNearby: () => {
			dispatch(loadNearby());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CleanersList);
