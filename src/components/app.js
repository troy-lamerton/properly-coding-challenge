import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import CleanerList from './cleaners-list';
import NotFound from './not-found';

function App({ route }) {
	if (!route || route.name === '404') {
		return <NotFound/>;
	}

	return (
		<div>
			<CleanerList/>
		</div>
	);
}

App.propTypes = {
	route: PropTypes.object.isRequired
};

export default connect(routeNodeSelector(''))(App);
