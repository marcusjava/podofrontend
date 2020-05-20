import React, { useState, useEffect, useRef } from 'react';
import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { Row, Col, Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Clients } from '../../redux/actions/clientActions';
import { Form } from '@unform/web';
import { DatePicker, TextArea, Select, Input } from '../../components/common/Form';
import * as Yup from 'yup';
import { consults } from '../../redux/actions/consultActions';
import { Procedures } from '../../redux/actions/procedureActions';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { parseISO } from 'date-fns';
import './styles.css';

dayjs.extend(utc);

function EditConsult({ initial }) {
	const [show, setShow] = useState(false);
	const { clients } = useSelector((state) => state.client);
	const { procedures } = useSelector((state) => state.procedure);
	const dispatch = useDispatch();

	const formRef = useRef(null);

	useEffect(() => {
		dispatch(Clients());
		dispatch(Procedures());
	}, [dispatch]);

	const handleSubmit = async (data) => {
		try {
			const schema = Yup.object().shape({
				date: Yup.string().required('Informe a data da consulta'),
				client: Yup.string().ensure().required('Informe o cliente'),
				procedures: Yup.string().ensure().required('Informe os procedimentos'),
				type_consult: Yup.string().ensure().required('Informe o tipo de consulta'),
			});
			await schema.validate(data, { abortEarly: false });
			const sendData = {
				_id: data._id,
				date: dayjs(data.date).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
				client: data.client.value,
				procedures: data.procedures.map((procedure) => procedure.value),
				type_consult: data.type_consult,
				observations: data.observations,
				status: data.status,
			};
			try {
				const response = await axios.put(`/consults/${sendData._id}`, sendData);
				console.log(response);
				if (response.status === 200) {
					dispatch(consults());
					toastr.success('Consulta atualizada com sucesso');
					formRef.current.setErrors({});
					formRef.current.reset();
					setShow(false);
				}
			} catch (error) {
				const { data } = error.response;
				const errorMessages = {};
				errorMessages[data.path] = data.message;
				formRef.current.setErrors(errorMessages);
			}
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errorMessages = {};
				error.inner.forEach((erro) => {
					errorMessages[erro.path] = erro.message;
					formRef.current.setErrors(errorMessages);
				});
			}
		}
	};

	const clientInputChange = (input) => {
		if (input.length >= 3) {
			dispatch(Clients({ name: input }));
		}
		if (input.length === 0) {
			dispatch(Clients());
		}
	};

	return (
		<>
			<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit"> Editar consulta</Tooltip>}>
				<button className="btn btn-link" onClick={() => setShow(true)}>
					<FaEdit size={20} />
				</button>
			</OverlayTrigger>

			<Modal size="lg" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Editar consulta</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						ref={formRef}
						initialData={{
							_id: initial._id,
							date: parseISO(initial.date),
							client: { value: initial.client._id, label: initial.client.name },
							procedures: initial.procedures.map((procedure) => ({
								value: procedure._id,
								label: procedure.name,
							})),
							type_consult: initial.type_consult,
							status: initial.status,
							observations: initial.observations,
						}}
						onSubmit={handleSubmit}
					>
						<Input type="hidden" name="_id" />
						<Row>
							<Col md={6}>
								<DatePicker placeholderText="Data/hora" name="date" />
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Select
									label="Cliente"
									name="client"
									options={clients.options}
									onInputChange={(input) => clientInputChange(input)}
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Select label="Procedimentos" isMulti name="procedures" options={procedures.options} />
							</Col>
						</Row>
						<Row>
							<Col md={3}>
								<Select
									label="Tipo consulta"
									name="type_consult"
									options={[
										{ label: 'Agendada', value: 0 },
										{ label: 'Retorno', value: 1 },
										{ label: 'Urgência', value: 2 },
									]}
								/>
							</Col>
						</Row>
						<Row>
							<Col md={3}>
								<Select
									label="Status"
									name="status"
									options={[
										{ value: 2, label: 'Cancelada' },
										{ value: 3, label: 'Remarcada' },
									]}
								/>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<TextArea rows={10} col={15} label="Observações" name="observations" />
							</Col>
						</Row>

						<Row>
							<Col md={12} className="text-right">
								<Button type="submit" variant="primary">
									Salvar
								</Button>
								<Button variant="danger" onClick={() => setShow(false)}>
									Cancelar
								</Button>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditConsult;
