import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { Clients } from '../../redux/actions/clientActions';
import { MdRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Table = ({ rowSelect, data }) => {
	const dispatch = useDispatch();

	const selectRowProp = {
		mode: 'radio',
		clickToSelect: false,
		onSelect: (row, isSelected, e) => rowSelect(row, isSelected),
	};

	const actionFormat = (cell, row) => {
		return (
			<div className="form-iline">
				<Link to={`/inicio/clientes/detalhes/${row._id}`}>
					<MdRemoveRedEye />
				</Link>
			</div>
		);
	};

	const pictureFormat = (cell, row) => {
		return (
			<a href={cell} target="_blank">
				<img src={cell} alt="Perfil" style={{ width: '50px', height: '50px', borderRadius: 50 }} />
			</a>
		);
	};

	const instaFormat = (cell, row) => {
		return (
			<a href={cell} target="_blank">
				{cell}
			</a>
		);
	};

	const handleNameChange = e => {
		const { value } = e.target;
		if (value) {
			dispatch(Clients({ name: value }));
		} else {
			dispatch(Clients());
		}
	};
	const handleEmailChange = e => {
		const { value } = e.target;
		if (value) {
			dispatch(Clients({ email: value }));
		} else {
			dispatch(Clients());
		}
	};

	const handleCpfChange = e => {
		const { value } = e.target;
		if (value) {
			dispatch(Clients({ cpf: value }));
		} else {
			dispatch(Clients());
		}
	};

	const handleContactChange = e => {
		const { value } = e.target;
		if (value) {
			dispatch(Clients({ contact: value }));
		} else {
			dispatch(Clients());
		}
	};

	return (
		<BootstrapTable data={data} striped hover version="4" selectRow={selectRowProp} pagination>
			<TableHeaderColumn isKey dataField="id" hidden>
				Id
			</TableHeaderColumn>
			<TableHeaderColumn dataField="avatar_url" dataFormat={pictureFormat} width="90">
				Foto
			</TableHeaderColumn>
			<TableHeaderColumn dataField="name" dataSort={true}>
				Nome
				<br />
				<input type="text" style={{ width: '120px' }} onChange={handleNameChange} />
			</TableHeaderColumn>
			<TableHeaderColumn dataField="email" dataSort={true}>
				Email
				<br />
				<input type="text" style={{ width: '120px' }} onChange={handleEmailChange} />
			</TableHeaderColumn>
			<TableHeaderColumn dataField="insta_url" dataFormat={instaFormat}>
				Instagram
			</TableHeaderColumn>
			<TableHeaderColumn dataField="cpf" dataSort={true}>
				CPF
				<br />
				<input type="text" style={{ width: '120px' }} onChange={handleCpfChange} />
			</TableHeaderColumn>

			<TableHeaderColumn dataField="contact" dataSort={true}>
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
