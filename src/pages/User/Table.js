import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PwdModal } from '../../components/common/Form';
import classnames from 'classnames';
import { getUsers } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Table = ({ rowSelect }) => {
	const { items } = useSelector((state) => state.user.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const statusFormat = (cell, row) => {
		return (
			<span
				className={classnames({
					badge: true,
					'badge-primary': cell.value === '0',
					'badge-danger': cell.value === '1',
				})}
			>
				{cell.label}
			</span>
		);
	};

	const editFormat = (cell, row) => {
		return <PwdModal id={row.id} />;
	};

	const pictureFormat = (cell, row) => {
		return (
			<a href={cell} target="_blank" rel="noopener noreferrer">
				<img src={cell} alt="Perfil" style={{ width: '50px', height: '50px', borderRadius: 50 }} />
			</a>
		);
	};

	const selectRowProp = {
		mode: 'radio',
		clickToSelect: false,
		onSelect: (row, isSelected, e) => rowSelect(row),
	};

	const handleNameChange = (e) => {
		const { value } = e.target;
		if (value) {
			dispatch(getUsers({ name: value }));
		} else {
			dispatch(getUsers());
		}
	};
	const handleEmailChange = (e) => {
		const { value } = e.target;
		if (value) {
			dispatch(getUsers({ email: value }));
		} else {
			dispatch(getUsers());
		}
	};

	const handleContactChange = (e) => {
		const { value } = e.target;
		if (value) {
			dispatch(getUsers({ contact: value }));
		} else {
			dispatch(getUsers());
		}
	};
	return (
		<BootstrapTable data={items} striped hover version="4" selectRow={selectRowProp} pagination>
			<TableHeaderColumn isKey dataField="id" hidden>
				Id
			</TableHeaderColumn>
			<TableHeaderColumn dataField="thumbnail_url" dataFormat={pictureFormat} width="90">
				Foto
			</TableHeaderColumn>
			<TableHeaderColumn dataField="name" dataSort={true}>
				Nome
				<br />
				<input
					type="text"
					style={{ width: '140px' }}
					className="filter text-filter form-control"
					onChange={handleNameChange}
				/>
			</TableHeaderColumn>

			<TableHeaderColumn dataField="email" dataSort={true}>
				Email
				<br />
				<input
					type="text"
					className="filter text-filter form-control"
					style={{ width: '140px' }}
					onChange={handleEmailChange}
				/>
			</TableHeaderColumn>
			<TableHeaderColumn dataField="phone" width="120">
				Contato
				<br />
				<input
					type="text"
					className="filter text-filter form-control"
					style={{ width: '100px' }}
					onChange={handleContactChange}
				/>
			</TableHeaderColumn>

			<TableHeaderColumn dataField="address" dataFormat={(cell, row) => cell.street}>
				Rua
			</TableHeaderColumn>
			<TableHeaderColumn dataField="address" dataFormat={(cell, row) => cell.neighborhood}>
				Bairro
			</TableHeaderColumn>
			<TableHeaderColumn dataField="address" dataFormat={(cell, row) => cell.city}>
				Cidade
			</TableHeaderColumn>
			<TableHeaderColumn dataField="address" dataFormat={(cell, row) => cell.state} width="90">
				Estado
			</TableHeaderColumn>
			<TableHeaderColumn dataField="status" width="90" dataFormat={statusFormat}>
				Status
			</TableHeaderColumn>
			<TableHeaderColumn dataFormat={editFormat} width="90">
				Ações
			</TableHeaderColumn>
		</BootstrapTable>
	);
};

export default Table;
