import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Clients } from '../../redux/actions/clientActions';
import { Row, Col, Card, ListGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InputFilter = () => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.client.clients);
	const [value, setValue] = useState('');

	const searchFilter = (e) => {
		const text = e.target.value;
		if (text.length >= 3) {
			dispatch(Clients({ name: text }));
		}
	};

	const listItems = value && (
		<ul
			className="list-unstyled bg-white"
			style={{ position: 'absolute', top: '30px', right: '25px', width: '240px' }}
		>
			{items.map((item, index) => (
				<li className="media p-2 border border-primary rounded" key={item._id}>
					<img
						className="mr-1"
						src={item.avatar_url}
						alt="Perfil"
						style={{ width: '50px', height: '50px' }}
					/>
					<div className="media-body">
						<p>{item.name}</p>
						<div className="text-right">
							<a href="#">
								<Link to={`/inicio/clientes/detalhes/${item._id}`}>Ver</Link>
							</a>
						</div>
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
						onInput={searchFilter}
						onChange={(e) => setValue(e.target.value)}
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
