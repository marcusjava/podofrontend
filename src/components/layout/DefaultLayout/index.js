import React, { Fragment } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { Container } from 'react-bootstrap';
import { Switch, Redirect } from 'react-router-dom';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
import PrivateRoute from '../../common/PrivateRoute';

import routes from '../../../routes';

const routeLinks = {
	'/inicio/principal': 'Inicio',
	'/inicio/consultas/:id': 'Consultas',
	'/inicio/consulta/:id': 'Detalhes Consulta',
	'/inicio/clientes': 'Cadastro de clientes',
	'/inicio/clientes/detalhes/:id': 'Detalhes Cliente',
	'/inicio/administrador/usuario': 'Usuarios',
	'/inicio/administrador/usuario/pwd_change': 'Alterar senha',
	'/inicio/administrador/servico': 'Serviços',
	'/inicio/administrador/procedimento': 'Procedimentos',
	'/inicio/administrador/logs': 'Logs sistema',
};

const DefaultLayout = () => {
	return (
		<Fragment>
			<NavBar />
			<Breadcrumbs mappedRoutes={routeLinks} />
			<Container fluid style={{ marginTop: '20px', marginBottom: '150px', width: '95%' }}>
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
			<Footer />
		</Fragment>
	);
};

export default DefaultLayout;
