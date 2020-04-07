import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import Table from '../Consult/Table';

const Dashboard = () => {
	return (
		<Container fluid>
			<Row>
				<Col className="text-center my-4">
					<h4 className="title">MinhasConsultas</h4>
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
