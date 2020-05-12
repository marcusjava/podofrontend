import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { IoIosSearch } from 'react-icons/io';
import axios from 'axios';
import Inspector from 'react-json-inspector';

const options = [
	{ value: 0, label: 'Selecione' },
	{ value: 1, label: 'Consultas' },
	{ value: 2, label: 'Fotos' },
];
const Logs = () => {
	const [id, setId] = useState('');
	const [items, setItems] = useState([]);

	const handleSearch = async (e) => {
		e.preventDefault();
		const response = await axios.get(`consults/${id}/logs`);
		setItems(response.data);
	};

	const handleSelect = (option) => {
		if (option.value === 1) {
		}
		if (option.value === 2) {
		}
	};
	return (
		<>
			<Row className="justify-content-center mb-4">
				<Col md={4} className="text-center">
					<p className="title text-center">Log de alterações</p>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col md={4}>
					<div className="form-inline">
						<input
							type="text"
							placeholder="Codigo da consulta"
							className="form-control"
							value={id}
							onChange={(e) => setId(e.target.value)}
						/>
						<Button type="button" onClick={handleSearch}>
							<IoIosSearch size={20} />
						</Button>
					</div>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col>{items.length > 0 && <Inspector data={items} />}</Col>
			</Row>
		</>
	);
};

export default Logs;
