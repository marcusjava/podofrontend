import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FaTrashAlt } from 'react-icons/fa';
import { Badge, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Procedures } from '../../redux/actions/procedureActions';
import { deletePhoto } from '../../redux/actions/procedureActions';
import './styles.css';

const Table = ({ rowSelect }) => {
	const { items } = useSelector(state => state.procedure.procedures);

	useEffect(() => {
		dispatch(Procedures());
	}, []);

	const selectRowProp = {
		mode: 'radio',
		clickToSelect: false,
		onSelect: (row, isSelected, e) => rowSelect(row),
	};

	const dispatch = useDispatch();

	const formatService = (cell, row) => {
		return cell.description;
	};

	const formatPhotos = (cell, row) => {
		return (
			<div>
				{cell.map((photo, idx) => (
					<Badge pill variant="primary" key={idx}>
						<a href={`http://localhost:3001/files/${photo}`} target="_blank" rel="noopener noreferrer">
							<Image
								src={`http://localhost:3001/files/${photo}`}
								roundedCircle
								style={{ width: '35px', height: '35px' }}
							/>
						</a>
						<button
							className="btn btn-link text-white"
							onClick={() => dispatch(deletePhoto(row.id, photo))}
						>
							X
						</button>
					</Badge>
				))}
			</div>
		);
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
			<TableHeaderColumn dataField="photos" dataFormat={formatPhotos}>
				Fotos
			</TableHeaderColumn>
		</BootstrapTable>
	);
};

export default Table;
