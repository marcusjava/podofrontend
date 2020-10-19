import React from 'react';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';

const routeLinks = {
	'/inicio/principal': '',
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

const Breadcrumb = ({ children }) => {
	return <Breadcrumbs mappedRoutes={routeLinks} />;
};

export default Breadcrumb;
