import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { consults } from '../../redux/actions/consultActions';
import dayjs from 'dayjs';
import PhotoList from '../../components/consult/PhotoList';
import Spinner from '../../components/common/Spinner';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';

const Consults = () => {
	const { id } = useParams();
	const { items, loading } = useSelector((state) => state.consult.consults);
	const [pageOfItems, setPageOfItems] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(consults({ client_id: id }));
	}, [dispatch, id]);

	const onChangePage = (pageOfItems) => {
		setPageOfItems(pageOfItems);
	};

	return loading ? (
		<Spinner />
	) : (
		<>
			<Row>
				<Col m4={4}>
					<p className="title text-center">Consultas</p>
				</Col>
			</Row>

			{pageOfItems.map((item) => (
				<Row key={item._id}>
					<Col md={12}>
						<div className="border border-primary bg-light p-3 mt-3">
							<p>
								<strong>Data/Hora</strong> -{' '}
								<Link to={`/inicio/consulta/${item._id}`}>
									{dayjs(item.date).format('DD/MM/YYYY HH:mm')}
								</Link>
							</p>
							<p>
								<strong>Cliente:</strong> {item.client.name}
							</p>
							<p>
								<strong>Procedimentos:</strong> {item.procedures.map((proc) => proc.name).join(', ')}
							</p>
							<p>
								<strong>Anamnese:</strong> {item.anamnese.desc_proc}
							</p>
							<p>
								<strong>Fotos:</strong>
							</p>
							<PhotoList photos={item.photos} width="307px" height="204px" />

							<p className="mt-2">
								<strong>Status:</strong> {item.status.label}
							</p>
						</div>
					</Col>
				</Row>
			))}

			<Row>
				<div className="row mx-auto my-4">
					<Pagination onChangePage={onChangePage} items={items} pageSize={5} />
				</div>
			</Row>
		</>
	);
};

export default Consults;
