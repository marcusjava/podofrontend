import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Input, TextArea } from '../../components/common/Form';
import { toastr } from 'react-redux-toastr';
import Table from './Table';
import axios from 'axios';

const Service = () => {
	const [editMod, setEditMod] = useState(false);
	const [services, setServices] = useState([]);

	const formRef = useRef(null);

	async function loadServices() {
		const result = await axios.get('/services');
		setServices(result.data);
	}

	useEffect(() => {
		loadServices();
	}, []);

	const saveData = async (data) => {
		try {
			const schema = Yup.object().shape({
				description: Yup.string().required('Descrição obrigatoria'),
			});
			await schema.validate(data, { abortEarly: false });
			axios
				.post('/services', data)
				.then((response) => {
					toastr.success('Serviço criado com sucesso');
					formRef.current.reset();
					setEditMod(false);
					formRef.current.setErrors({});
					loadServices();
				})
				.catch((error) => {
					console.log(error);
				});
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

	const updateData = async (data) => {
		try {
			const schema = Yup.object().shape({
				description: Yup.string().required('Descrição obrigatoria'),
			});
			await schema.validate(data, { abortEarly: false });
			axios
				.put(`/services/${data._id}`, data)
				.then((response) => {
					toastr.success('Serviço criado com sucesso');
					formRef.current.reset();
					setEditMod(false);
					loadServices();
					formRef.current.setErrors({});
				})
				.catch((error) => {
					const { data } = error.response;
					console.log(data);
				});
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

	const handleSubmit = (data) => {
		if (editMod) {
			updateData(data);
		} else {
			saveData(data);
		}
	};

	const rowSelect = (row, isSelected) => {
		setEditMod(true);
		formRef.current.setData(row);
	};

	return (
		<>
			<Row clas="justify-content-center">
				<Col md={12} className="text-center">
					<p className="title">Cadastro Serviços</p>
				</Col>
			</Row>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Row>
					<Col md={6}>
						<Input name="_id" hidden />
						<Input name="description" label="Descrição" style={{ width: '60%' }} />
						<TextArea name="observations" label="Observações" rows="5" cols="33" />
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
					<Table data={services} rowSelect={rowSelect} />
				</Col>
			</Row>
		</>
	);
};

export default Service;
