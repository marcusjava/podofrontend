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
	{ path: '/inicio/principal', name: 'Inicio', Component: Dashboard },
	{ path: '/inicio/consultas', name: 'Consultas', Component: Consults },
	{ path: '/inicio/consulta/:id', name: 'Detalhes Consulta', Component: Consult },
	{ path: '/inicio/clientes', exact: true, name: 'Cadadastro Clientes', Component: CadClient },
	{ path: '/inicio/clientes/detalhes/:id', name: 'Detalhes Cliente', Component: ClientDetail },
	{ path: '/inicio/administrador/usuario', name: 'Usuarios', Component: User },
	{ path: '/inicio/administrador/servico', name: 'Serviços', Component: Service },
	{ path: '/inicio/administrador/procedimento', name: 'PProcedimentos', Component: Procedure },
	{ path: '/inicio/administrador/logs', name: 'Logs Sistema', Component: Logs },
];

export default routes;
