import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { toastr } from 'react-redux-toastr';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Clients } from '../../redux/actions/clientActions';
import { Form } from '@unform/web';
import { DatePicker, TextArea, Select } from '../../components/common/Form';
import * as Yup from 'yup';
import { consults } from '../../redux/actions/consultActions';
import { Procedures } from '../../redux/actions/procedureActions';
import { MdNoteAdd } from 'react-icons/md';
import CustomClientOptions from '../../components/common/Form/CustomClientOptions';
import axios from 'axios';

dayjs.extend(utc);

function AddConsult() {
	const [show, setShow] = useState(false);

	const { clients } = useSelector((state) => state.client);

	const { procedures } = useSelector((state) => state.procedure);

	const dispatch = useDispatch();

	const formRef = useRef(null);

	useEffect(() => {
		dispatch(Clients());
		dispatch(Procedures());
	}, [dispatch]);

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
				procedures: data.procedures.map((procedure) => procedure.value),
				type_consult: data.type_consult,
				observations: data.observations,
				status: { value: '0', label: 'Marcada' },
			};
			try {
				const response = await axios.post('/consults', sendData);
				if (response.status === 201) {
					dispatch(consults());
					formRef.current.setErrors({});
					formRef.current.reset();
					setShow(false);
					toastr.success('Consulta marcada com sucesso');
				}
			} catch (error) {
				const errorMessages = {};
				const { data } = error.response;
				errorMessages[data.path] = data.message;
				formRef.current.setErrors(errorMessages);
				toastr.error('Já existe uma consulta marcada para este horario');
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
			<Button className="btn btn-primary text-white my-4" onClick={() => setShow(true)}>
				<MdNoteAdd /> Consulta
			</Button>

			<Modal size="lg" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Criar consulta</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form ref={formRef} onSubmit={handleSubmit}>
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
									components={{ Option: CustomClientOptions }}
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

export default AddConsult;
