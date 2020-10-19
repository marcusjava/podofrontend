import React, { Fragment } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { Container } from 'react-bootstrap';
import { Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../../common/PrivateRoute';

import routes from '../../../routes';

const DefaultLayout = () => {
	return (
		<Fragment>
			<NavBar />

			<Container fluid style={{ marginTop: '140px', width: '95%' }}>
				<Switch>
					{routes.map((route, idx) => {
						return route.Component ? (
							<PrivateRoute
								exact={route.exact}
								key={idx}
								component={route.Component}
								path={route.path}
								name={route.name}
							/>
						) : null;
					})}
					<Redirect from="/inicio" to="/inicio/principal" />
				</Switch>
			</Container>
		</Fragment>
	);
};

export default DefaultLayout;
