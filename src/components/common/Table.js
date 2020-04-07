import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const Table = ({ data }) => {
	return (
		<BootstrapTable data={data} striped hover version="4">
			<TableHeaderColumn isKey dataField="id">
				Usuarios
			</TableHeaderColumn>
			<TableHeaderColumn dataField="name">Nome</TableHeaderColumn>
			<TableHeaderColumn dataField="email">Email</TableHeaderColumn>
			<TableHeaderColumn dataField="phone">Contato</TableHeaderColumn>
			<TableHeaderColumn dataField="address">Bairro</TableHeaderColumn>
			<TableHeaderColumn dataField="address.street">Rua</TableHeaderColumn>
			<TableHeaderColumn dataField="address.neighborhood">Bairro</TableHeaderColumn>
			<TableHeaderColumn dataField="address.city">Cidade</TableHeaderColumn>
		</BootstrapTable>
	);
};

export default Table;
