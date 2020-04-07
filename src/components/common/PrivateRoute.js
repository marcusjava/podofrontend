import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authenticated } = useSelector((state) => state.user.user);

	return (
		<Route
			{...rest}
			render={(props) => (authenticated === true ? <Component {...props} /> : <Redirect to="/" />)}
		/>
	);
};

PrivateRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
