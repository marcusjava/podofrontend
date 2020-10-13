import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Procedures } from '../../redux/actions/procedureActions';
import Spinner from '../../components/common/Spinner';
import { MdEdit } from 'react-icons/md';
import './styles.css';

const Table = ({ rowSelect }) => {
	const { items, loading } = useSelector((state) => state.procedure.procedures);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(Procedures());
	}, [dispatch]);

	const formatService = (cell, row) => {
		return cell.description;
	};

	const actionFormat = (cell, row) => {
		return (
			<div className="form-iline">
				<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Editar</Tooltip>}>
					<Button onClick={() => rowSelect(row)} variant="link">
						<MdEdit size={24} />
						&nbsp;
					</Button>
				</OverlayTrigger>
			</div>
		);
	};

	return loading ? (
		<Spinner />
	) : (
		<BootstrapTable
			data={items}
			striped
			hover
			version="4"
			pagination
			options={{ noDataText: 'Não há itens a exibir' }}
		>
			<TableHeaderColumn isKey dataField="_id" hidden>
				Id
			</TableHeaderColumn>
			<TableHeaderColumn dataField="name" filter={{ type: 'TextFilter', delay: 1000 }} dataSort={true}>
				Procedimento
			</TableHeaderColumn>
			<TableHeaderColumn
				dataField="service"
				filter={{ type: 'TextFilter', delay: 1000 }}
				dataSort={true}
				dataFormat={formatService}
				width={'180px'}
			>
				Serviço
			</TableHeaderColumn>
			<TableHeaderColumn dataField="description">Descrição</TableHeaderColumn>
			<TableHeaderColumn width="90" dataFormat={actionFormat}>
				Ações
			</TableHeaderColumn>
		</BootstrapTable>
	);
};

export default Table;
