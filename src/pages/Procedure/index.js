import React, { useRef, useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Input, TextArea, Select, InputMask } from '../../components/common/Form';
import Table from '../../components/procedure/Table';
import { useSelector, useDispatch } from 'react-redux';
import { saveProcedure, updateProcedure } from '../../redux/actions/procedureActions';
import { getServices } from '../../redux/actions/serviceActions';
import Loading from '../../components/common/Loading';
import { toastr } from 'react-redux-toastr';

const Procedure = () => {
	const [editMod, setEditMod] = useState(false);

	const { success, error, loading } = useSelector((state) => state.procedure.procedure);
	const services = useSelector((state) => state.service.services);
	const dispatch = useDispatch();

	const formRef = useRef(null);

	useEffect(() => {
		dispatch(getServices());
		return () => {
			dispatch({ type: 'CLEAR_PROCEDURE_STATE' });
		};
	}, [dispatch]);

	const rowSelect = (row) => {
		setEditMod(true);
		formRef.current.setData({
			_id: row._id,
			service: { value: row.service._id, label: row.service.description },
			name: row.name,
			price: row.price,
			description: row.description,
		});
	};

	useEffect(() => {
		if (success === true) {
			toastr.success('Procedimento salvo com sucesso!');
			setEditMod(false);
			formRef.current.setErrors({});
			formRef.current.reset();
		}
		if (error !== undefined && Object.keys(error).length > 0) {
			const errorMessages = {};
			errorMessages[error.path] = error.message;

			formRef.current.setErrors(errorMessages);
			toastr.error('Ocorreu um erro ao salvar o procedimento');
		}
	}, [success, error]);

	const handleSubmit = async (data) => {
		try {
			const schema = Yup.object().shape({
				service: Yup.string().ensure().required('Campo obrigatorio'),
				name: Yup.string().required('Preencha o procedimento'),
			});
			await schema.validate(data, { abortEarly: false });
			const sendData = {
				service: data.service.value,
				name: data.name,
				price: data.price,
				description: data.description,
			};
			editMod ? dispatch(updateProcedure(sendData, data._id)) : dispatch(saveProcedure(sendData));
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errorMessages = {};
				error.inner.forEach((erro) => {
					console.log(error);
					errorMessages[erro.path] = erro.message;
					formRef.current.setErrors(errorMessages);
				});
			}
		}
	};

	return (
		<>
			<Loading show={loading} />
			<Row>
				<Col m4={4}>
					<p className="title text-center">Cadastro Procedimentos</p>
				</Col>
			</Row>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Row>
					<Col md={6}>
						<Input name="_id" hidden />
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
					<Col md={1}>
						<InputMask name="price" mask="9999" maskPlaceholder={null} label="Preço R$" />
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
