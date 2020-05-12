import React from 'react';
import Loadable from 'react-loadable';
import Spinner from './components/common/Spinner';

const Loading = () => <Spinner />;

const Dashboard = Loadable({
	loader: () => import('./pages/Dashboard'),
	loading: Loading,
});

const User = Loadable({
	loader: () => import('./pages/User'),
	loading: Loading,
});

const Service = Loadable({
	loader: () => import('./pages/Service'),
	loading: Loading,
});

const Procedure = Loadable({
	loader: () => import('./pages/Procedure'),
	loading: Loading,
});
const Client = Loadable({
	loader: () => import('./pages/Client/CardItems'),
	loading: Loading,
});

const CadClient = Loadable({
	loader: () => import('./pages/Client'),
	loading: Loading,
});

const ClientDetail = Loadable({
	loader: () => import('./pages/Client/ClientDetail'),
	loading: Loading,
});

const Consults = Loadable({
	loader: () => import('./pages/Consult/Consults'),
	loading: Loading,
});

const Consult = Loadable({
	loader: () => import('./pages/Consult/Consult'),
	loading: Loading,
});

const Logs = Loadable({
	loader: () => import('./pages/Logs'),
	loading: Loading,
});

const routes = [
	{ path: '/inicio/principal', name: 'Dashboard', Component: Dashboard },
	{ path: '/inicio/consultas', name: 'Consults', Component: Consults },
	{ path: '/inicio/consulta/:id', name: 'Consult', Component: Consult },
	{ path: '/inicio/clientes', exact: true, name: 'Client', Component: Client },
	{ path: '/inicio/clientes/detalhes/:id', name: 'ClientDetail', Component: ClientDetail },
	{ path: '/inicio/administrador/usuario', name: 'User', Component: User },
	{ path: '/inicio/administrador/servico', name: 'Service', Component: Service },
	{ path: '/inicio/administrador/procedimento', name: 'Procedure', Component: Procedure },
	{ path: '/inicio/administrador/clientes', name: 'CadClient', Component: CadClient },
	{ path: '/inicio/administrador/logs', name: 'Logs', Component: Logs },
];

export default routes;
