import React, { Fragment, useState, useEffect, useRef } from 'react';
import './styles.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Table from './Table';
import { FileUpload, Input, CheckBox, Select } from '../../components/common/Form';
import { useSelector, useDispatch } from 'react-redux';
import { register, updateUser } from '../../redux/actions/userActions';

const User = () => {
	const [editMod, setEditMode] = useState(false);

	const formRef = useRef(null);

	const { user } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		if (user.success === true) {
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

	const saveData = async (data) => {
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
		formRef.current.setFieldValue('nasc', row.nasc);
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
			<Form ref={formRef} onSubmit={handleSubmit} autocomplete="off">
				<Row className="justify-content-center">
					<Col md={2}>
						<FileUpload name="thumbnail" />
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Input name="id" hidden />
						<Input name="name" label="Nome" style={{ width: '80%' }} maxLength={150} />
					</Col>
					<Col md={6} className="d-inline-flex ">
						<Input
							name="phone"
							label="Contato"
							placeholder="Ex. XX XXXXX-XXXX"
							style={{ width: '200px', marginRight: '5px' }}
							maxLength={13}
						/>
						<Input
							label="CPF"
							placeholder="Ex xxxxxxxxxxx"
							name="cpf"
							style={{ width: '200px' }}
							maxLength={11}
						/>
					</Col>
				</Row>

				<Row>
					<Col md={6} className="d-inline-flex">
						<Input
							name="rg"
							label="RG"
							style={{ width: '180px', marginRight: '25px' }}
							placeholder="Ex xxxxxxxx"
							maxLength={8}
						/>
						<Input
							name="nasc"
							placeholder="Ex. xx-xx-xxxx"
							style={{ width: '200px' }}
							label="Nascimento"
							maxLength={10}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Input name="email" type="email" label="Email" style={{ width: '50%' }} maxLength={100} />
					</Col>

					<Col md={6} className="d-inline-flex">
						<CheckBox name="role.Administrador" label="Administrador" />
						<CheckBox name="role.Usuario" label="Usuario" />
					</Col>
				</Row>
				<Row>
					<Col md={6} className="d-inline-flex">
						<Input
							name="address.street"
							style={{ width: '340px', marginRight: '5px' }}
							label="Rua"
							maxLength={100}
						/>
						<Input name="address.neighborhood" style={{ width: '280px' }} label="Bairro" maxLength={70} />
					</Col>
					<Col md={6} className="d-inline-flex ">
						<Input
							name="address.city"
							style={{ width: '280px', marginRight: '5px' }}
							label="Cidade"
							maxLength={70}
						/>
						<Input name="address.state" style={{ width: '50px' }} label="Estado" maxLength={2} />
					</Col>
				</Row>
				<Row>
					<Col md={6} className="d-inline-flex ">
						<Input name="address.cep" style={{ width: '160px', marginRight: '5px' }} label="CEP" />
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
					<Col>
						<input style={{ display: 'none' }} type="text" name="fakeusernameremembered" />
					</Col>
				</Row>
				<Row>
					<Col md={6} className="d-inline-flex">
						<Input
							autocomplete="off"
							disabled={editMod}
							name="password"
							type="password"
							style={{ width: '200px', marginRight: '10px' }}
							label="Senha"
						/>
						<Input
							autocomplete="off"
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
						<Button variant="danger" onClick={() => window.location.reload()}>
							Cancelar
						</Button>
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
