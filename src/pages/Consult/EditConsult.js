import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Clients, searchClients } from '../../redux/actions/clientActions';
import { Form } from '@unform/web';
import { DatePicker, TextArea, Select, Input } from '../../components/common/Form';
import * as Yup from 'yup';
import { updateConsult } from '../../redux/actions/consultActions';
import { Procedures, searchProcedures } from '../../redux/actions/procedureActions';
import { FaEdit } from 'react-icons/fa';

dayjs.extend(utc);

function EditConsult({ initial }) {
	const [clientSel, setClientSel] = useState({});
	const [show, setShow] = useState(false);

	const { clients } = useSelector((state) => state.client);

	const { success, error } = useSelector((state) => state.consult.consult);

	const { procedures } = useSelector((state) => state.procedure);
	const dispatch = useDispatch();

	const formRef = useRef(null);

	useEffect(() => {
		dispatch(Clients());
		dispatch(Procedures());
	}, []);

	useEffect(() => {
		if (success === true) {
			formRef.current.setErrors({});
			formRef.current.reset();
			setShow(false);
		}
		if (error === false) {
			const errorMessages = {};
			errorMessages[error.path] = error.message;
			formRef.current.setErrors(errorMessages);
		}
	}, [success, error]);

	const handleSubmit = async (data, { reset }) => {
		try {
			const schema = Yup.object().shape({
				date: Yup.string().required('Informe a data da consulta'),
				client: Yup.string().ensure().required('Informe o cliente'),
				procedures: Yup.string().ensure().required('Informe os procedimentos'),
				type_consult: Yup.string().ensure().required('Informe o tipo de consulta'),
			});
			await schema.validate(data, { abortEarly: false });
			const sendData = {
				date: dayjs(data.date).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
				client: data.client.value,
				procedures: data.procedures,
				type_consult: data.type_consult,
				observations: data.observations,
				status: { value: '0', label: 'Marcada' },
			};

			dispatch(updateConsult(sendData));
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
		if (input) {
			dispatch(searchClients(input));
		}
	};

	const procedInputChange = (input) => {
		if (input) {
			dispatch(searchProcedures(input));
		} else {
			dispatch(Procedures());
		}
	};

	const onDateChanger = (date) => {
		console.log(date);
	};

	const clientSelectChange = (e) => {
		const selected = clients.items.filter((client) => client.id == e.value);
		setClientSel(selected);
	};

	return (
		<>
			<span className="mx-2" onClick={() => setShow(true)}>
				<FaEdit />
			</span>

			<Modal size="lg" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Editar consulta</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						ref={formRef}
						initialData={{
							_id: initial._id,
							date: initial.date,
							client: { value: initial.client._id, label: initial.client.name },
							procedures: initial.procedures.map((procedure) => ({
								value: procedure._id,
								label: procedure.name,
							})),
							type_consult: initial.type_consult,
							observations: initial.observations,
						}}
						onSubmit={handleSubmit}
					>
						<Row>
							<Col md={6}>
								<DatePicker
									placeholderText="Data/hora"
									name="date"
									onSelect={(date) => onDateChanger(date)}
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Select
									label="Cliente"
									name="client"
									onChange={(e) => clientSelectChange(e)}
									options={clients.options}
									onInputChange={(input) => clientInputChange(input)}
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Select
									label="Procedimentos"
									isMulti
									name="procedures"
									options={procedures.options}
									onInputChange={(input) => procedInputChange(input)}
								/>
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
