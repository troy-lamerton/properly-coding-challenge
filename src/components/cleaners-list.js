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

		let cleanersStars = cleaners.map((cleaner, index) => {
			const starArray = new Array(Math.ceil(cleaner.rating))
			starArray.fill(<img className="star" src="/star.png" />);
			return starArray;
		});
		return (
			<div className="cleaners-list">
				<div className="buttons">
					<a className="left" onClick={loadNearby()}>NEARBY</a><br/>
					<a className="right" onClick={loadBest()}>BEST</a>
				</div>
				<ul className="list">
					{cleaners.map((cleaner, index) => {
						return (
							<li key={index} className="cleaner">
								<div className="profile-pic">
									<img src="https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg"/>
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
					})}
				</ul>
			</div>
		);
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
