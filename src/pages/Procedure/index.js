import React, { useRef, useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Input, TextArea, FileMultiUpload, Select } from '../../components/common/Form';
import Table from './Table';
import { useSelector, useDispatch } from 'react-redux';
import { saveProcedure, updateProcedure } from '../../redux/actions/procedureActions';
import { Services } from '../../redux/actions/serviceActions';

const Procedure = () => {
	const [editMod, setEditMod] = useState(false);

	const procedure = useSelector((state) => state.procedure.procedure);
	const services = useSelector((state) => state.service.services);
	const dispatch = useDispatch();

	const formRef = useRef(null);

	useEffect(() => {
		dispatch(Services());
	}, [dispatch]);

	const rowSelect = (row) => {
		setEditMod(true);
		formRef.current.setFieldValue('service', { value: row.service._id, label: row.service.description });
		formRef.current.setData(row);
	};

	useEffect(() => {
		if (procedure.success == true) {
			setEditMod(false);
			formRef.current.setErrors({});
			formRef.current.reset();
		}
		if (procedure.error) {
			const errorMessages = {};
			errorMessages[procedure.error.path] = procedure.error.message;
			formRef.current.setErrors(errorMessages);
		}
	}, [procedure.success, procedure.error]);

	const handleSubmit = async (data) => {
		try {
			const schema = Yup.object().shape({
				thumbnails: Yup.array().max(3, 'Limite de 5 fotos'),
				service: Yup.string().ensure().required('Campo obrigatorio'),
				name: Yup.string().required('Preencha o procedimento'),
			});
			await schema.validate(data, { abortEarly: false });
			const sendData = new FormData();
			data.thumbnails.forEach((thumb) => {
				sendData.append('thumbnails', thumb);
			});
			sendData.append('service', data.service.value);
			sendData.append('name', data.name);
			sendData.append('description', data.description);
			editMod ? dispatch(updateProcedure(sendData, data._id)) : dispatch(saveProcedure(sendData));
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errorMessages = {};
				console.log(error.inner);
				error.inner.forEach((erro) => {
					errorMessages[erro.path] = erro.message;
					formRef.current.setErrors(errorMessages);
				});
			}
		}
	};

	return (
		<>
			<Row>
				<Col m4={4}>
					<p className="title text-center">Cadastro Procedimentos</p>
				</Col>
			</Row>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Row>
					<Col md={3}>
						<Input name="_id" hidden />
						<FileMultiUpload name="thumbnails" />
					</Col>
				</Row>

				<Row className="mt-4">
					<Col md={3}>
						<Select name="service" label="Serviço" options={services.options} />
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<Input name="name" label="Procedimento" />
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<TextArea name="description" label="Descrição" rows="8" />
					</Col>
				</Row>
				<Row>
					<Col md={6} className="text-right">
						<Button type="submit" variant="primary">
							{editMod ? 'Atualizar' : 'Salvar'}
						</Button>
						<Button variant="danger" onClick={() => window.location.reload()}>
							Cancela
						</Button>
					</Col>
				</Row>
			</Form>
			<Row className="my-4">
				<Col md={12}>
					<Table rowSelect={rowSelect} />
				</Col>
			</Row>
		</>
	);
};

export default Procedure;
