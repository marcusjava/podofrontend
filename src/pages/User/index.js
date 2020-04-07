import React, { Fragment, useState, useEffect, useRef } from 'react';
import './styles.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Table from './Table';
import { FileUpload, Input, CheckBox, Select } from '../../components/common/Form';
import { useSelector, useDispatch } from 'react-redux';
import { register, getUsers, updateUser } from '../../redux/actions/userActions';

const User = () => {
	const [editMod, setEditMode] = useState(false);

	const formRef = useRef(null);

	const { user } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		if (user.success == true) {
			setEditMode(false);
			formRef.current.setErrors({});
			formRef.current.reset();
		}
		if (user.error) {
			const errorMessages = {};
			errorMessages[user.error.path] = user.error.message;
			formRef.current.setErrors(errorMessages);
		}
	}, [user.success, user.error]);

	const saveData = async (data, reset) => {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatorio'),
				email: Yup.string().email('Formato incorreto!').required('Email obrigatorio!'),
				cpf: Yup.string().required('Informe o cpf'),
				address: Yup.object().shape({
					street: Yup.string().required('Rua obrigatoria'),
					neighborhood: Yup.string().required('Bairro obrigatorio'),
					city: Yup.string().required('Cidade obrigatoria'),
					state: Yup.string().required('Estado obrigatoria'),
				}),
				password: Yup.string()
					.required('Senha obrigatoria!')
					.oneOf([Yup.ref('password2'), null], 'Senhas não conferem!'),
				password2: Yup.string().required('Informe confirmação de senha'),
			});
			await schema.validate(data, { abortEarly: false });
			dispatch(register(data));
			// axios
			// 	.post('/users/register', sendData)
			// 	.then(response => {
			// 		console.log(response);
			// 		if (response.status == '201') {
			// 			toastr.success('Usuario criado com sucesso');
			// 			reset();
			// 			setEditMode(false);
			// 			formRef.current.setErrors({});
			// 		}
			// 	})
			// 	.catch(error => {
			// 		if (error.response.data.path === 'cpf') {
			// 			formRef.current.setFieldError('cpf', error.response.data.message);
			// 			toastr.error(error.response.data.message);
			// 		}
			// 		if (error.response.data.email) {
			// 			formRef.current.setFieldError('email', error.response.data.email);
			// 			toastr.error(error.response.data.email);
			// 		}
			// 	});
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

	const updateData = async (data, reset) => {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatorio'),
				email: Yup.string().email('Formato incorreto!').required('Email obrigatorio!'),
				cpf: Yup.string().required('Informe o cpf'),
				address: Yup.object().shape({
					street: Yup.string().required('Rua obrigatoria'),
					neighborhood: Yup.string().required('Bairro obrigatorio'),
					city: Yup.string().required('Cidade obrigatoria'),
					state: Yup.string().required('Estado obrigatoria'),
				}),
			});
			await schema.validate(data, { abortEarly: false });
			dispatch(updateUser(data));
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
	const handleSubmit = (data, { reset }) => {
		if (editMod) {
			updateData(data, reset);
		} else {
			saveData(data, reset);
		}
	};

	//Table functions neighborhood

	const rowSelect = (row) => {
		setEditMode(true);
		formRef.current.setFieldValue('id', row.id);
		formRef.current.setFieldValue('name', row.name);
		formRef.current.setFieldValue('phone', row.phone);
		formRef.current.setFieldValue('cpf', row.cpf);
		formRef.current.setFieldValue('email', row.email);
		formRef.current.setFieldValue('rg', row.rg);
		formRef.current.setFieldValue('role.Administrador', row.role.Administrador);
		formRef.current.setFieldValue('role.Usuario', row.role.Usuario);
		formRef.current.setFieldValue('address.street', row.address.street);
		formRef.current.setFieldValue('address.neighborhood', row.address.neighborhood);
		formRef.current.setFieldValue('address.city', row.address.city);
		formRef.current.setFieldValue('address.state', row.address.state);
		formRef.current.setFieldValue('address.cep', row.address.cep);
		formRef.current.setFieldValue('address.nasc', row.address.nasc);
		formRef.current.setFieldValue('status', row.status);
	};

	return (
		<Fragment>
			<Row>
				<Col m4={4}>
					<p className="title text-center">Cadastro Usuarios</p>
				</Col>
			</Row>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Row className="justify-content-center">
					<Col md={2}>
						<FileUpload name="thumbnail" />
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Input name="id" hidden />
						<Input name="name" label="Nome" style={{ width: '80%' }} />
					</Col>
					<Col md={6} className="d-inline-flex ">
						<Input name="phone" label="Contato" style={{ width: '200px', marginRight: '5px' }} />
						<Input label="CPF" placeholder="Ex xxx.xxx.xxx-xx" name="cpf" style={{ width: '200px' }} />
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Input name="email" type="email" label="Email" label="Email" style={{ width: '50%' }} />
					</Col>

					<Col md={6} className="d-inline-flex">
						<Input
							name="rg"
							label="RG"
							style={{ width: '180px', marginRight: '25px' }}
							placeholder="Ex x.xxx.xxx-x"
						/>
						<CheckBox type="checkbox" name="role.Administrador" label="Administrador" />
						<CheckBox type="checkbox" name="role.Usuario" label="Usuario" />
					</Col>
				</Row>
				<Row>
					<Col md={6} className="d-inline-flex">
						<Input name="address.street" style={{ width: '340px', marginRight: '5px' }} label="Rua" />
						<Input name="address.neighborhood" style={{ width: '190px' }} label="Bairro" />
					</Col>
					<Col md={6} className="d-inline-flex ">
						<Input name="address.city" style={{ width: '240px', marginRight: '5px' }} label="Cidade" />
						<Input name="address.state" style={{ width: '160px' }} label="Estado" />
					</Col>
				</Row>
				<Row>
					<Col md={6} className="d-inline-flex ">
						<Input name="address.cep" style={{ width: '160px', marginRight: '5px' }} label="CEP" />
						<Input name="nasc" placeholder="Ex. xx-xx-xxxx" style={{ width: '200px' }} label="Nascimento" />
					</Col>
					<Col md={2}>
						<Select
							label="Status"
							name="status"
							style={{ width: 200 }}
							options={[
								{ value: 0, label: 'Ativo' },
								{ value: 1, label: 'Inativo' },
							]}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6} className="d-inline-flex">
						<Input
							disabled={editMod}
							name="password"
							type="password"
							style={{ width: '200px', marginRight: '10px' }}
							label="Senha"
						/>
						<Input
							disabled={editMod}
							name="password2"
							type="password"
							style={{ width: '200px' }}
							label="Confirma Senha"
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6}></Col>
					<Col md={6} className="text-right">
						<Button type="submit" variant="primary">
							{editMod ? 'Atualizar' : 'Salvar'}
						</Button>
						<Button variant="danger">Cancela</Button>
					</Col>
					<Col md={6}></Col>
				</Row>
			</Form>
			<Row>
				<Col md={12} className="my-4">
					<Table rowSelect={rowSelect} />
				</Col>
			</Row>
		</Fragment>
	);
};

export default User;
