import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const Table = ({ data, rowSelect }) => {
	const selectRowProp = {
		mode: 'radio',
		clickToSelect: false,
		onSelect: (row, isSelected, e) => rowSelect(row, isSelected),
	};

	return (
		<BootstrapTable data={data} striped hover version="4" selectRow={selectRowProp} pagination>
			<TableHeaderColumn isKey dataField="_id" hidden>
				Id
			</TableHeaderColumn>
			<TableHeaderColumn
				dataField="description"
				filter={{ type: 'TextFilter', delay: 1000 }}
				dataSort={true}
				width="500px"
			>
				Descrição
			</TableHeaderColumn>
			<TableHeaderColumn dataField="observations">Observações</TableHeaderColumn>
		</BootstrapTable>
	);
};

export default Table;
