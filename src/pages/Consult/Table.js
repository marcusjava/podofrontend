import React, { useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Badge, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { consults, updateConsult } from '../../redux/actions/consultActions';
import DatePicker, { registerLocale } from 'react-datepicker';
import { IoIosSearch, IoMdCloseCircle } from 'react-icons/io';
import { FaBriefcaseMedical, FaPrint } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import EditConsult from './EditConsult';
import br from 'date-fns/locale/pt-BR';
import { toastr } from 'react-redux-toastr';
import './styles.css';

registerLocale('pt-br', br);

const Table = ({ client_id }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.consult.consults);

	const [dateI, setDateI] = useState(undefined);
	const [dateF, setDateF] = useState(undefined);
	const [client, setClient] = useState('');

	useEffect(() => {
		if (client_id) {
			dispatch(consults({ client_id }));
		} else {
			dispatch(consults());
		}
	}, [dispatch, client_id]);

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
				{cell.value === '0' ? (
					<Badge variant="primary">Agendada</Badge>
				) : cell.value === '1' ? (
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
				{cell.value === '0' ? (
					<Badge variant="warning">Marcada</Badge>
				) : cell.value === '1' ? (
					<Badge variant="success">Realizada</Badge>
				) : cell.value === '2' ? (
					<Badge variant="danger">Cancelada</Badge>
				) : (
					<Badge variant="primary">Remarcada</Badge>
				)}
			</div>
		);
	};

	const cancelConsult = (e, row) => {
		e.preventDefault();
		if (row.status.value === '1') {
			toastr.error('Consulta realizada não pode ser cancelada!');
			return;
		}
		if (row.status.value === '2') {
			toastr.error('Consulta já se encontra cancelada!');
			return;
		}
		const confirm = window.confirm('Tem certeza que deseja cancelar a consulta?');
		if (confirm == true) {
			row.status = { value: 2, label: 'Cancelada' };
			dispatch(updateConsult(row));
		}
	};

	const actionsFormat = (cell, row) => {
		return (
			<div className="list-inline">
				<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Cancelar Consulta</Tooltip>}>
					<button className="btn btn-link" onClick={(e) => cancelConsult(e, row)}>
						<IoMdCloseCircle size={20} color="red" />
					</button>
				</OverlayTrigger>

				{row.status.value !== '2' && (
					<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit"> Realizar consulta</Tooltip>}>
						<Link to={`/inicio/consulta/${row.id}`}>
							<FaBriefcaseMedical size={20} color="#62B3B1" />
						</Link>
					</OverlayTrigger>
				)}
				<EditConsult initial={row} />
				{row.status.value !== '2' && row.status.value === '1' && (
					<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Imprimir Ficha</Tooltip>}>
						<Link to={`/ficha/${row.id}`}>
							<FaPrint size={20} />
						</Link>
					</OverlayTrigger>
				)}
			</div>
		);
	};

	const filterDateHandle = (e) => {
		e.preventDefault();
		const start = dateI && dayjs(dateI).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		const end = dateF && dayjs(dateF).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		dispatch(consults({ start, end }));
	};

	const filterClientChange = (e) => {
		const filtered = e.target.value;
		const start = dateI && dayjs(dateI).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		const end = dateF && dayjs(dateF).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		if (filtered.length >= 3) {
			dispatch(consults({ start, end, client }));
		}
		if (filtered.length === 0) {
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
			<Button type="button" onClick={filterDateHandle}>
				<IoIosSearch size={20} />
			</Button>
		</div>
	);

	const handleDateChange = (e) => {
		console.log(e.target.value);
	};

	return (
		<>
			<BootstrapTable data={items} striped hover version="4" pagination>
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
				<TableHeaderColumn
					dataField="client"
					dataFormat={(cell, row) => (
						<>
							<a href={cell.avatar_url} rel="noopener noreferrer" className="mr-1" target="_blank">
								<img
									src={cell.avatar_url}
									alt="Perfil"
									style={{ width: '40px', height: '40px', borderRadius: 50 }}
								/>
							</a>
							<Link to={`/inicio/clientes/detalhes/${cell._id}`}>{cell.name}</Link>
						</>
					)}
				>
					Cliente
					<br />
					<input
						type="text"
						placeholder="Digite o nome"
						onChange={(e) => setClient(e.target.value)}
						onInput={filterClientChange}
						value={client}
					/>
				</TableHeaderColumn>
				<TableHeaderColumn
					width="120"
					dataField="client"
					dataFormat={(cell, row) => <label>{cell.contact}</label>}
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
				<TableHeaderColumn width="160" dataFormat={actionsFormat}>
					Ações
				</TableHeaderColumn>
			</BootstrapTable>
		</>
	);
};

export default Table;
