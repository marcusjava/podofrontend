import React, { Fragment, useState, useEffect, useRef } from 'react';
import './styles.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Table from '../../components/user/Table';
import { FileUpload, Input, CheckBox, Select, InputMask } from '../../components/common/Form';
import { useSelector, useDispatch } from 'react-redux';
import { register, updateUser } from '../../redux/actions/userActions';
import ImageResize from '../../utils/ImageResize';
import Loading from '../../components/common/Loading';
import { toastr } from 'react-redux-toastr';

const User = () => {
	const [editMod, setEditMode] = useState(false);
	const [showPwd, setShowPwd] = useState(true);

	const formRef = useRef(null);

	const { success, error, loading } = useSelector((state) => state.user.user);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch({ type: 'CLEAR_USER_STATE' });
		};
	}, []);

	useEffect(() => {
		if (success === true) {
			setEditMode(false);
			toastr.success('Usuario salvo com sucesso');
			formRef.current.setErrors({});
			formRef.current.reset();
		}
		if (Object.keys(error).length > 0) {
			const errorMessages = {};
			errorMessages[error.path] = error.message;
			formRef.current.setErrors(errorMessages);
		}
	}, [success, error]);

	const rowSelect = (row) => {
		setEditMode(true);
		setShowPwd(false);
		formRef.current.setFieldValue('_id', row.id);
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

	const handleSubmit = async (data, { reset }) => {
		console.log(data);
		try {
			let schema;
			if (showPwd) {
				schema = Yup.object().shape({
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
			} else {
				schema = Yup.object().shape({
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
			}

			await schema.validate(data, { abortEarly: false });

			const imageResized = await ImageResize(data.thumbnail);

			const sendData = new FormData();
			sendData.append('thumbnail', imageResized || null);
			sendData.append('name', data.name);
			sendData.append('phone', data.phone);
			sendData.append('nasc', data.nasc);
			sendData.append('cpf', data.cpf);
			sendData.append('rg', data.rg);
			sendData.append('email', data.email);
			sendData.append('address', JSON.stringify(data.address));
			if (showPwd) {
				sendData.append('password', data.password);
				sendData.append('password2', data.password2);
			}

			sendData.append('role', JSON.stringify(data.role));
			sendData.append('status', JSON.stringify(data.status));
			editMod ? dispatch(updateUser(sendData, data._id)) : dispatch(register(sendData));
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

	//Table functions neighborhood

	return (
		<Fragment>
			<Loading show={loading} />
			<Row>
				<Col m4={4}>
					<p className="title text-center">Cadastro Usuarios</p>
				</Col>
			</Row>
			<Form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
				<Row className="justify-content-center">
					<Col md={2}>
						<FileUpload name="thumbnail" />
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Input name="_id" hidden />
						<Input name="name" label="Nome" style={{ width: '80%' }} maxLength={150} />
					</Col>
					<Col md={6} className="d-inline-flex ">
						<InputMask
							name="phone"
							label="Contato"
							mask="99 99999-9999"
							style={{ width: '200px', marginRight: '5px' }}
						/>
						<InputMask label="CPF" mask="99999999999" name="cpf" style={{ width: '80%' }} />
					</Col>
				</Row>

				<Row>
					<Col md={6} className="d-inline-flex">
						<InputMask
							name="rg"
							label="RG"
							mask="99999999"
							style={{ width: '180px', marginRight: '25px' }}
						/>
						<InputMask name="nasc" mask="99/99/9999" style={{ width: '200px' }} label="Nascimento" />
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
					{showPwd ? (
						<Col md={6} className="d-inline-flex">
							<Input
								autoComplete="off"
								name="password"
								type="password"
								style={{ width: '200px', marginRight: '10px' }}
								label="Senha"
							/>
							<Input
								autoComplete="off"
								name="password2"
								type="password"
								style={{ width: '200px' }}
								label="Confirma Senha"
							/>
							{editMod && showPwd && (
								<button className="btn btn-link" onClick={() => setShowPwd(false)}>
									Cancelar
								</button>
							)}
						</Col>
					) : (
						<button className="btn btn-link" onClick={() => setShowPwd(true)}>
							Alterar senha
						</button>
					)}
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
