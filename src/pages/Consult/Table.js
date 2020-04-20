import React, { useState } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Badge, Button } from 'react-bootstrap';
import { consults } from '../../redux/actions/consultActions';
import DatePicker, { registerLocale } from 'react-datepicker';
import { IoIosSearch } from 'react-icons/io';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import EditConsult from './EditConsult';
import br from 'date-fns/locale/pt-BR';
import './styles.css';

registerLocale('pt-br', br);

const Table = ({ data }) => {
	const dispatch = useDispatch();

	const [dateI, setDateI] = useState(undefined);
	const [dateF, setDateF] = useState(undefined);
	const [client, setClient] = useState('');

	const proceduresFormat = (cell, row) => {
		return (
			<div>
				<ul className="list-unstyled">
					{cell.map((proc, idx) => (
						<li key={idx}>
							<Badge variant="success">
								<span className="font-weight-bold">{proc.name}</span>
							</Badge>
						</li>
					))}
				</ul>
			</div>
		);
	};

	const typeFormat = (cell, row) => {
		return (
			<div>
				{cell.value == 0 ? (
					<Badge variant="primary">Agendada</Badge>
				) : cell.value == 1 ? (
					<Badge variant="success">Retorno</Badge>
				) : (
					<Badge variant="danger">Urgência</Badge>
				)}
			</div>
		);
	};

	const statusFormat = (cell, row) => {
		return (
			<div>
				{cell.value == 0 ? (
					<Badge variant="primary">Marcada</Badge>
				) : cell.value == 1 ? (
					<Badge variant="success">Realizada</Badge>
				) : (
					<Badge variant="danger">Cancelada</Badge>
				)}
			</div>
		);
	};

	const actionsFormat = (cell, row) => {
		return (
			<div className="list-inline">
				<Link to={`/inicio/consulta/${row.id}`}>
					<FaBriefcaseMedical />
				</Link>
				<EditConsult initial={row} />
			</div>
		);
	};

	const filterDateHandle = (e) => {
		e.preventDefault();
		const start = dateI && dayjs(dateI).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		const end = dateF && dayjs(dateF).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		dispatch(consults(start, end));
	};

	const filterClientChange = (e) => {
		setClient(e.target.value);
		const start = dateI && dayjs(dateI).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		const end = dateF && dayjs(dateF).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		setClient(e.target.value);
		if (client) {
			dispatch(consults(start, end, client));
		} else {
			dispatch(consults());
		}
	};

	const filterDateFields = (
		<div className="form-inline">
			<DatePicker
				placeholderText="Data Inicial"
				selected={dateI}
				onChange={(date) => setDateI(date)}
				fixedHeight
				className="only-hour"
				name="dateI"
				isClearable={true}
				dateFormat="dd/MM/yyyy"
				locale="pt-br"
			/>

			<DatePicker
				placeholderText="Data Final"
				selected={dateF}
				onChange={(date) => setDateF(date)}
				fixedHeight
				className="only-hour"
				name="dateF"
				isClearable={true}
				dateFormat="dd/MM/yyyy"
				locale="pt-br"
			/>
			<Button type="button" size="sm" onClick={filterDateHandle}>
				<IoIosSearch />
			</Button>
		</div>
	);

	const handleDateChange = (e) => {
		console.log(e.target.value);
	};

	return (
		<>
			<BootstrapTable data={data} striped hover version="4" pagination>
				<TableHeaderColumn isKey dataField="id" hidden>
					Id
				</TableHeaderColumn>
				<TableHeaderColumn
					dataField="date"
					width="300"
					dataFormat={(cell, row) => (
						<p className="font-weight-bold">{dayjs(cell).format('DD/MM/YYYY HH:mm').toString()}</p>
					)}
				>
					Data
					<br />
					{filterDateFields}
				</TableHeaderColumn>
				<TableHeaderColumn dataField="client" dataFormat={(cell, row) => cell.name} dataSort={true}>
					Cliente
					<br />
					<input type="text" placeholder="Digite o nome" onChange={filterClientChange} value={client} />
				</TableHeaderColumn>
				<TableHeaderColumn
					width="120"
					dataField="client"
					dataFormat={(cell, row) => <label>{cell.contact}</label>}
					filter={{ type: 'TextFilter', delay: 1000 }}
					dataSort={true}
				>
					Telefone
				</TableHeaderColumn>
				<TableHeaderColumn dataField="procedures" dataFormat={proceduresFormat}>
					Procedimentos
				</TableHeaderColumn>

				<TableHeaderColumn dataField="observations">Observações</TableHeaderColumn>
				<TableHeaderColumn dataField="type_consult" width="120" dataFormat={typeFormat}>
					Tipo consulta
				</TableHeaderColumn>
				<TableHeaderColumn dataField="status" dataFormat={statusFormat} width="100">
					Status
				</TableHeaderColumn>
				<TableHeaderColumn width="90" dataFormat={actionsFormat}>
					Ações
				</TableHeaderColumn>
			</BootstrapTable>
		</>
	);
};

export default Table;
