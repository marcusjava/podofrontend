import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Clients, searchClients } from '../../redux/actions/clientActions';
import { Form } from '@unform/web';
import { DatePicker, TextArea, Select } from '../../components/common/Form';
import * as Yup from 'yup';
import { saveConsult } from '../../redux/actions/consultActions';
import { Procedures, searchProcedures } from '../../redux/actions/procedureActions';
import { MdNoteAdd } from 'react-icons/md';
import Table from './Table';

dayjs.extend(utc);

function AddConsult() {
	const [clientSel, setClientSel] = useState({});
	const [show, setShow] = useState(false);

	const { clients } = useSelector(state => state.client);

	const { success, error } = useSelector(state => state.consult.consult);

	const { procedures } = useSelector(state => state.procedure);
	const dispatch = useDispatch();

	const formRef = useRef(null);

	useEffect(() => {
		dispatch(Clients());
		dispatch(Procedures());
	}, []);

	useEffect(() => {
		if (success == true) {
			formRef.current.setErrors({});
			formRef.current.reset();
		}
		if (error == true) {
			const errorMessages = {};
			errorMessages[error.path] = error.message;
			formRef.current.setErrors(errorMessages);
		}
	}, [success, error]);

	const handleSubmit = async (data, { reset }) => {
		console.log(data);
		try {
			const schema = Yup.object().shape({
				date: Yup.string().required('Informe a data da consulta'),
				client: Yup.string()
					.ensure()
					.required('Informe o cliente'),
				procedures: Yup.string()
					.ensure()
					.required('Informe os procedimentos'),
			});
			await schema.validate(data, { abortEarly: false });
			const sendData = new FormData();
			sendData.append('date', dayjs(data.date).format('YYYY-MM-DDTHH:mm:ss.sssZ'));
			sendData.append('client', data.client.value);
			sendData.append('procedures', data.procedures);
			sendData.append('type', data.type);
			sendData.append('observations', data.observations);
			dispatch(saveConsult(sendData));
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errorMessages = {};
				error.inner.forEach(erro => {
					errorMessages[erro.path] = erro.message;
					formRef.current.setErrors(errorMessages);
				});
			}
		}
	};

	const clientInputChange = input => {
		if (input) {
			dispatch(searchClients(input));
		}
	};

	const procedInputChange = input => {
		if (input) {
			dispatch(searchProcedures(input));
		} else {
			dispatch(Procedures());
		}
	};

	const onDateChanger = date => {
		console.log(date);
	};

	const clientSelectChange = e => {
		const selected = clients.items.filter(client => client.id == e.value);
		console.log(selected);
		setClientSel(selected);
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
								<DatePicker
									placeholderText="Data/hora"
									showTimeSelect
									name="date"
									isClearable={true}
									onSelect={date => onDateChanger(date)}
									timeFormat="HH:mm"
									timeIntervals={10}
									timeCaption="Hora"
									dateFormat="dd/MM/yyyy HH:mm"
									locale="pt-BR"
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Select
									label="Cliente"
									name="client"
									onChange={e => clientSelectChange(e)}
									options={clients.options}
									onInputChange={input => clientInputChange(input)}
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
									onInputChange={input => procedInputChange(input)}
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Select
									label="Tipo consulta"
									isMulti
									name="type"
									options={[
										{ value: 0, label: 'Agendada' },
										{ value: 1, label: 'Retorno' },
										{ value: 2, label: 'Urgência' },
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
