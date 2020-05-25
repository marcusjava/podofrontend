import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Badge, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Procedures } from '../../redux/actions/procedureActions';
import './styles.css';

const Table = ({ rowSelect }) => {
	const { items } = useSelector((state) => state.procedure.procedures);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(Procedures());
	}, [dispatch]);

	const selectRowProp = {
		mode: 'radio',
		clickToSelect: false,
		onSelect: (row) => rowSelect(row),
	};

	const formatService = (cell, row) => {
		return cell.description;
	};

	return (
		<BootstrapTable data={items} striped hover version="4" selectRow={selectRowProp} pagination>
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
		</BootstrapTable>
	);
};

export default Table;
