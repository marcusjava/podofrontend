import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Input, TextArea } from '../../components/common/Form';
import { useSelector, useDispatch } from 'react-redux';
import { saveService, updateService } from '../../redux/actions/serviceActions';
import { toastr } from 'react-redux-toastr';
import Loading from '../../components/common/Loading';
import Table from '../../components/service/Table';

const Service = () => {
	const [editMod, setEditMod] = useState(false);

	const dispatch = useDispatch();

	const { error, success, loading } = useSelector((state) => state.service.service);

	const formRef = useRef(null);

	useEffect(() => {
		return () => {
			dispatch({ type: 'CLEAR_SERVICE_STATE' });
		};
	}, []);

	useEffect(() => {
		if (success === true) {
			toastr.success('Serviço salvo com sucesso!');
			setEditMod(false);
			formRef.current.setErrors({});
			formRef.current.reset();
		}
		if (error !== undefined && Object.keys(error).length > 0) {
			const errorMessages = {};
			errorMessages[error.path] = error.message;

			formRef.current.setErrors(errorMessages);
			toastr.error('Ocorreu um erro ao salvar o serviço');
		}
	}, [success, error]);

	const rowSelect = (row) => {
		setEditMod(true);
		formRef.current.setData({
			_id: row._id,
			description: row.description,
			observations: row.observations,
		});
	};

	const handleSubmit = async (data) => {
		try {
			const schema = Yup.object().shape({
				description: Yup.string().required('Descrição obrigatoria'),
			});
			await schema.validate(data, { abortEarly: false });
			editMod ? dispatch(updateService(data, data._id)) : dispatch(saveService(data));
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

	return (
		<>
			<Loading show={loading} />
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
					<Table rowSelect={rowSelect} />
				</Col>
			</Row>
		</>
	);
};

export default Service;
