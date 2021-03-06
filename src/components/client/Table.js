import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Clients } from '../../redux/actions/clientActions';
import { MdRemoveRedEye, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Table = ({ rowSelect, data }) => {
	const dispatch = useDispatch();

	const actionFormat = (cell, row) => {
		return (
			<div className="form-iline">
				<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Ver</Tooltip>}>
					<Link to={`/inicio/clientes/detalhes/${row._id}`}>
						<MdRemoveRedEye size={24} />
					</Link>
				</OverlayTrigger>
				<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Editar</Tooltip>}>
					<Button onClick={() => rowSelect(row)} variant="link">
						<MdEdit size={24} />
						&nbsp;
					</Button>
				</OverlayTrigger>
			</div>
		);
	};

	const pictureFormat = (cell, row) => {
		return (
			<a href={cell} target="_blank" rel="noopener noreferrer">
				<img src={cell} alt="Perfil" style={{ width: '50px', height: '50px', borderRadius: 50 }} />
			</a>
		);
	};

	const instaFormat = (cell, row) => {
		return (
			<a href={cell} target="_blank" rel="noopener noreferrer">
				{cell}
			</a>
		);
	};

	const handleNameChange = (e) => {
		const { value } = e.target;
		if (value) {
			dispatch(Clients({ name: value }));
		} else {
			dispatch(Clients());
		}
	};

	const handleCpfChange = (e) => {
		const { value } = e.target;
		if (value) {
			dispatch(Clients({ cpf: value }));
		} else {
			dispatch(Clients());
		}
	};

	const handleContactChange = (e) => {
		const { value } = e.target;
		if (value) {
			dispatch(Clients({ contact: value }));
		} else {
			dispatch(Clients());
		}
	};

	return (
		<BootstrapTable
			data={data}
			striped
			hover
			version="4"
			pagination
			options={{ noDataText: 'Não há itens a exibir' }}
		>
			<TableHeaderColumn isKey dataField="id" hidden>
				Id
			</TableHeaderColumn>
			<TableHeaderColumn dataField="avatar_url" dataFormat={pictureFormat} width="90">
				Foto
			</TableHeaderColumn>
			<TableHeaderColumn dataField="name" width="280">
				Nome
				<br />
				<input type="text" style={{ width: '200px' }} onChange={handleNameChange} />
			</TableHeaderColumn>

			<TableHeaderColumn dataField="instagram" dataFormat={instaFormat}>
				Instagram
			</TableHeaderColumn>
			<TableHeaderColumn dataField="cpf">
				CPF
				<br />
				<input type="text" style={{ width: '120px' }} onChange={handleCpfChange} />
			</TableHeaderColumn>

			<TableHeaderColumn dataField="contact">
				Contato
				<br />
				<input type="text" style={{ width: '120px' }} onChange={handleContactChange} />
			</TableHeaderColumn>

			<TableHeaderColumn dataField="address" dataFormat={(cell, row) => cell.street}>
				Rua
			</TableHeaderColumn>
			<TableHeaderColumn dataField="address" dataFormat={(cell, row) => cell.neighborhood}>
				Bairro
			</TableHeaderColumn>

			<TableHeaderColumn width="90" dataFormat={actionFormat}>
				Ações
			</TableHeaderColumn>
		</BootstrapTable>
	);
};

export default Table;
