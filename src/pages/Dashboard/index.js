import React from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import Table from '../Consult/Table';
import AddConsult from '../Consult/AddConsult';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	return (
		<Container fluid>
			<Row>
				<Col className="text-center my-4">
					<h4 className="title">Minhas Consultas</h4>
				</Col>
			</Row>
			<Row>
				<Col className="text-right">
					<Button as={Link} variant="info" className="mr-2" to="/inicio/clientes">
						<BsPersonFill size={20} />
						Cliente
					</Button>
					<AddConsult />
				</Col>
			</Row>
			<Row>
				<Col>
					<Table />
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
