import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { consults } from '../../redux/actions/consultActions';
import { Col, Row, Container } from 'react-bootstrap';
import Table from '../Consult/Table';
import AddConsult from '../Consult/AddConsult';

const Dashboard = () => {
	const { items } = useSelector((state) => state.consult.consults);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(consults());
	}, [dispatch]);

	return (
		<Container fluid>
			<Row>
				<Col className="text-center my-4">
					<h4 className="title">MinhasConsultas</h4>
				</Col>
			</Row>
			<Row>
				<Col className="text-right">
					<AddConsult />
				</Col>
			</Row>
			<Row>
				<Col>
					<Table data={items} />
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
