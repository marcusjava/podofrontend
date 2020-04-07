import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Clients } from '../../redux/actions/clientActions';
import { Card, Row, Col, Image, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';

import Pagination from '../../components/common/Pagination';

const CardItems = () => {
	const [selectOpt, setSelectOpt] = useState('name');
	const [pagedItems, setPagedItems] = useState([]);

	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.client.clients);

	useEffect(() => {
		function getClients() {
			dispatch(Clients());
		}

		getClients();
	}, []);

	const onNameChange = (e) => {
		const { value } = e.target;
		if (value) {
			console.log(value);
			dispatch(Clients({ name: e.target.value }));
		} else {
			dispatch(Clients());
		}
	};

	const onCpfChange = (e) => {
		const { value } = e.target;
		if (value) {
			dispatch(Clients({ cpf: e.target.value }));
		}
		dispatch(Clients());
	};

	const renderItems = pagedItems.map((client) => (
		<Col md={3} key={client._id}>
			<Card bg="light" className="my-4 card" border="info" style={{ width: '100%' }}>
				<div className="text-center">
					<Image src={client.avatar_url} className=" m-2 rounded-img" roundedCircle thumbnail />
				</div>

				<Card.Body>
					<Card.Title className="text-center mb-4">
						<p className="subtitle">{client.name}</p>
					</Card.Title>
					<Card.Title>{client.email}</Card.Title>
					<Card.Title>{client.contact}</Card.Title>
					<Card.Text>
						{client.address && client.address.street} {client.address && client.address.neighborhood}
					</Card.Text>
					<div className="text-right">
						<a href="#">
							<Link to={`/inicio/clientes/detalhes/${client._id}`}>Ver detalhes</Link>
						</a>
					</div>
				</Card.Body>
			</Card>
		</Col>
	));

	return (
		/**
		 * TODO
		 * Adicionar numero consultas e proxima consulta
		 *
		 */
		<Container fluid>
			<Row className="justify-content-center">
				<Col md={6} className="text-center">
					<p className="title">Meus Clientes</p>
				</Col>
			</Row>

			<Row className="justify-content-left">
				<Col md={{ span: 3, offset: 9 }}>
					<Card body>
						<Form.Check
							inline
							checked={selectOpt === 'name'}
							onChange={(e) => setSelectOpt(e.target.value)}
							name="search"
							value="name"
							label="Nome"
							type="radio"
						/>
						<Form.Check
							inline
							name="search"
							checked={selectOpt === 'cpf'}
							onChange={(e) => setSelectOpt(e.target.value)}
							value="cpf"
							label="CPF"
							type="radio"
						/>
						{selectOpt === 'name' && (
							<Form.Control
								name="name"
								placeholder="Digite o nome"
								onChange={onNameChange}
								className="input input-sm"
							/>
						)}
						{selectOpt === 'cpf' && (
							<Form.Control
								name="cpf"
								placeholder="Digite o cpf"
								onChange={onCpfChange}
								className="input input-sm"
							/>
						)}
					</Card>
				</Col>
			</Row>
			<Row>{renderItems}</Row>

			<Row>
				<Col>
					<Pagination items={items} onChangePage={(items) => setPagedItems(items)} pageSize={5} />
				</Col>
			</Row>
		</Container>
	);
};

export default CardItems;
