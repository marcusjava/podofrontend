import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClient, Clients } from '../../redux/actions/clientActions';
import dayjs from 'dayjs';
import './styles.css';
import Table from './Table';

const ClientDetail = () => {
	const dispatch = useDispatch();
	const { item } = useSelector((state) => state.client.client);
	const { items } = useSelector((state) => state.client.clients);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getClient(id));
		dispatch(Clients());
	}, []);

	return (
		<>
			<Row className="justify-content-center mb-4">
				<Col md={4} className="text-center">
					<Image className="rounded-img mt-2" roundedCircle src={item.avatar_url} />
					<p className="title text-center">{item.name}</p>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col>
					<p className="subtitle">Dados pessoais</p>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col md={3}>
					<p>
						<strong>Nome</strong> - {item.name}
					</p>
				</Col>
				<Col md={3}>
					<p>
						<strong>Email</strong> - {item.email}
					</p>
				</Col>
				<Col md={3}>
					<p>
						<strong>Contato</strong> - {item.contact}
					</p>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<p>
						<strong>CPF</strong> - {item.cpf}
					</p>
				</Col>
				<Col md={3}>
					<p>
						<strong>RG</strong> - {item.rg}
					</p>
				</Col>
				<Col md={3}>
					<p>
						<strong>Sexo</strong> - {item.sex && item.sex.label}
					</p>
				</Col>
				<Col md={3}>
					<p>
						<strong>Ocupação</strong> - {item.occupation}
					</p>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<p>
						<strong>Endereço</strong> - {item.address && item.address.street}
					</p>
				</Col>
				<Col md={3}>
					<p>
						<strong>Bairro</strong> - {item.address && item.address.neighborhood}
					</p>
				</Col>
				<Col md={3}>
					<p>
						<strong>Cidade</strong> - {item.address && item.address.city}
					</p>
				</Col>
				<Col md={3}>
					<p>
						<strong>Estado</strong> - {item.address && item.address.state}
					</p>
				</Col>
			</Row>
			<Row className="mb-4">
				<Col md={4}>
					<p>
						<strong>Registrado em</strong> - {dayjs(item.createdAt).format('DD/MM/YYYY')} por{' '}
						{item.createdBy && item.createdBy.name}
					</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className="subtitle">Consultas</p>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col md={12}>
					<Table data={items} />
				</Col>
			</Row>
		</>
	);
};

export default ClientDetail;
