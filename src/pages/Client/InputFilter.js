import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Clients } from '../../redux/actions/clientActions';
import { Row, Col, Card, ListGroup, Form } from 'react-bootstrap';

const InputFilter = () => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.client.clients);
	const [value, setValue] = useState('');

	const searchFilter = (e) => {
		dispatch(Clients({ name: e.target.value }));
		setValue(e.target.value);
	};

	const listItems = value && (
		<ul
			className="list-unstyled bg-white"
			style={{ position: 'absolute', top: '30px', right: '25px', width: '240px' }}
		>
			{items.map((item, index) => (
				<li className="media">
					<img
						className="mr-1"
						src={item.avatar_url}
						alt="Perfil"
						style={{ width: '50px', height: '50px' }}
					/>
					<div className="media-body">
						<h7>{item.name}</h7>
					</div>
				</li>
			))}
		</ul>
	);

	return (
		<>
			<Row>
				<Col>
					<Form.Control
						type="text"
						placeholder="Digite nome cliente"
						name="search"
						onChange={searchFilter}
						className="input input-sm mr-sm-2"
					/>
				</Col>
			</Row>
			<Row>
				<Col md={6}>{listItems}</Col>
			</Row>
		</>
	);
};

export default InputFilter;
