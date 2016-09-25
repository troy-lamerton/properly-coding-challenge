import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class CleanersList extends React.Component {

	loadCleaners = () => (event) => {
		event.preventDefault();
		// load cleaners from the database
	}

	render() {
		const cleaners = this.props.cleaners;
		const loadCleaners = this.loadCleaners;

		return (<div className="cleaners-list">
			<a onClick={loadCleaners()}>Cleaners Nearby</a><br/>
			<a onClick={loadCleaners()}>Best Cleaners</a>
			{/* TODO: display cleaners */}

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

export default connect(
	mapStateToProps,
	{}
)(CleanersList);
