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

		// get users location
		const lat = 37.77;
		const lng = -122.42;

		this.props.loadNearby(lat, lng);
	}

	render() {
		const cleaners = this.props.cleaners;
		const loadBest = this.loadBest;
		const loadNearby = this.loadNearby;

		let cleanersStars = cleaners.map(cleaner => {
			const starArray = new Array(Math.ceil(cleaner.rating));
			starArray.fill(<img className="star" src="/star.png"/>);
			return starArray;
		});

		return (
			<div className="cleaners-list">
				<div className="buttons">
					<a onClick={loadNearby()}>NEARBY</a><br/>
					<a onClick={loadBest()}>BEST</a>
				</div>
				<ul className="list">
					{(cleaners.length > 0) ? cleaners.map((cleaner, index) => {
						return (
							<li key={index} className="cleaner">
								<div className="profile-pic">
									<img src={cleaner.picture}/>
								</div>
								<div className="cleaner-info">
									{cleaner.name}
									<ul className="star-list">
										{cleanersStars[index].map((image, index) => {
											return <li key={index}>{image}</li>;
										})}
									</ul>
								</div>
							</li>
						);
					}) : <p>No cleaners to display</p>}
				</ul>
			</div>
		);
	}

}
CleanersList.propTypes = {
	cleaners: PropTypes.arrayOf(PropTypes.shape({
		rating: PropTypes.number.isRequired,
		name: PropTypes.string
	})),
	loadBest: PropTypes.func,
	loadNearby: PropTypes.func
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
		loadNearby: (lat, lng) => {
			dispatch(loadNearby(lat, lng));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CleanersList);
