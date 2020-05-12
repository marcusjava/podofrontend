import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Image, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';
import Spinner from '../../components/common/Spinner';
import axios from 'axios';
import { BsPersonFill } from 'react-icons/bs';

import Pagination from '../../components/common/Pagination';

const CardItems = () => {
	const [selectOpt, setSelectOpt] = useState('name');
	const [pagedItems, setPagedItems] = useState([]);
	const [items, setItems] = useState([]);

	async function getClients(query) {
		const response = await axios.get('/clients', { params: query });
		setItems(response.data);
	}

	useEffect(() => {
		getClients();
	}, []);

	const onNameChange = (e) => {
		const { value } = e.target;
		if (value.length >= 3) {
			getClients({ name: value });
		}
		if (value.length === 0) {
			getClients();
		}
	};

	const onCpfChange = (e) => {
		const { value } = e.target;
		if (value.length >= 3) {
			getClients({ cpf: value });
		}
		if (value.length === 0) {
			getClients();
		}
	};

	return items.length === 0 ? (
		<Spinner />
	) : (
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
					<Button as={Link} variant="info" className="mb-2" to="/inicio/administrador/clientes">
						<BsPersonFill size={20} />
						Cliente
					</Button>
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
								onInput={onNameChange}
								className="input input-sm"
							/>
						)}
						{selectOpt === 'cpf' && (
							<Form.Control
								name="cpf"
								placeholder="Digite o cpf"
								onInput={onCpfChange}
								className="input input-sm"
							/>
						)}
					</Card>
				</Col>
			</Row>
			<Row>
				{pagedItems.map((client) => (
					<Col md={3} key={client._id}>
						<Card
							bg="light"
							className="my-4 card"
							border="info"
							style={{ width: '100%', boxShadow: '10px 10px 17px -13px rgba(0,0,8,1)' }}
						>
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
									{client.address && client.address.street}{' '}
									{client.address && client.address.neighborhood}
								</Card.Text>
								<div className="text-right">
									<Link to={`/inicio/clientes/detalhes/${client._id}`}>Ver detalhes</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			<Row>
				<Col>
					<Pagination items={items} onChangePage={(items) => setPagedItems(items)} pageSize={5} />
				</Col>
			</Row>
		</Container>
	);
};

export default CardItems;
