import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { consults } from '../../redux/actions/consultActions';
import Table from './Table';
import AddConsult from './AddConsult';

const Consults = () => {
	const { items } = useSelector(state => state.consult.consults);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(consults());
	}, []);

	return (
		<>
			<Row>
				<Col m4={4}>
					<p className="title text-center">Consultas</p>
				</Col>
			</Row>
			<Row>
				<Col md={12} className="text-right">
					<AddConsult />
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<Table data={items} />
				</Col>
			</Row>
		</>
	);
};

export default Consults;
