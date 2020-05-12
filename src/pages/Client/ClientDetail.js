import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './styles.css';
import Table from '../Consult/Table';
import Spinner from '../../components/common/Spinner';
import axios from 'axios';

const ClientDetail = () => {
	const { id } = useParams();

	const [item, setItem] = useState({});

	useEffect(() => {
		async function getClient() {
			const response = await axios.get(`/clients/${id}`);
			setItem(response.data);
		}

		getClient();
	}, [id]);

	return Object.entries(item).length === 0 ? (
		<Spinner />
	) : (
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
				<Col md={6}>
					<p>
						<strong>Criado em</strong> - {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')} por{' '}
						{item.createdBy && item.createdBy.name}
					</p>
				</Col>
				<Col md={6}>
					<p>
						<strong>Atualizado em</strong> - {dayjs(item.updatedAt).format('DD/MM/YYYY HH:mm')} por{' '}
						{item.updatedBy && item.updatedBy.name}
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
					<Table client_id={item.id} />
				</Col>
			</Row>
		</>
	);
};

export default ClientDetail;
