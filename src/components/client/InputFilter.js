import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clients } from '../../redux/actions/clientActions';
import { Row, Col, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const InputFilter = () => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.client.clients);
	const [value, setValue] = useState('');

	const history = useHistory();

	const searchFilter = (e) => {
		const text = e.target.value;
		if (text.length >= 3) {
			dispatch(Clients({ name: text }));
		}
	};

	const goToDetail = (id) => {
		setValue('');
		history.push(`/inicio/clientes/detalhes/${id}`);
	};

	const listItems = value.length >= 3 && (
		<ul
			className="list-unstyled bg-white border-primary"
			style={{ position: 'absolute', top: '30px', right: '25px', width: '300px' }}
		>
			{items.length > 0 &&
				items.map((item, index) => (
					<li
						className="media p-2 rounded"
						style={{ backgroundColor: '#DEEBFF', borderRadius: '20' }}
						key={item._id}
					>
						<img
							className="mr-1"
							src={item.avatar_url}
							alt="Perfil"
							style={{ width: '50px', height: '50px' }}
						/>
						<div className="media-body">
							<p>{item.name}</p>
							<div className="text-right">
								<button className="btn btn-link" onClick={() => goToDetail(item._id)}>
									Ver
								</button>
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
						value={value}
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
