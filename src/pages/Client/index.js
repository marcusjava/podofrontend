import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { saveClient, updateClient, Clients } from '../../redux/actions/clientActions';
import { withRouter } from 'react-router-dom';
import { Form } from '@unform/web';
import { FileUpload, Input, Select } from '../../components/common/Form';
import * as Yup from 'yup';
import Table from './Table';

const Client = () => {
	const [editMod, setEditMode] = useState(false);

	const client = useSelector((state) => state.client.client);
	const { items } = useSelector((state) => state.client.clients);

	const dispatch = useDispatch();

	const formRef = useRef(null);

	useEffect(() => {
		dispatch(Clients());
	}, [dispatch]);

	useEffect(() => {
		if (client.success === true) {
			setEditMode(false);
			formRef.current.setErrors({});
			formRef.current.reset();
		}
		if (client.error) {
			const errorMessages = {};
			errorMessages[client.error.path] = client.error.message;
			formRef.current.setErrors(errorMessages);
		}
	}, [client.success, client.error]);

	const rowSelect = (row) => {
		setEditMode(true);
		formRef.current.setFieldValue('id', row._id);
		formRef.current.setFieldValue('name', row.name);
		formRef.current.setFieldValue('instagram', row.instagram);
		formRef.current.setFieldValue('cpf', row.cpf);
		formRef.current.setFieldValue('rg', row.rg);
		formRef.current.setFieldValue('email', row.email);
		formRef.current.setFieldValue('address.street', row.address.street);
		formRef.current.setFieldValue('address.neighborhood', row.address.neighborhood);
		formRef.current.setFieldValue('address.city', row.address.city);
		formRef.current.setFieldValue('address.state', row.address.state);
		formRef.current.setFieldValue('address.cep', row.address.cep);
		formRef.current.setFieldValue('occupation', row.occupation);
		formRef.current.setFieldValue('contact', row.contact);
		formRef.current.setFieldValue('nasc', row.nasc);
		formRef.current.setFieldValue('sex', row.sex);
		formRef.current.setFieldValue('etnia', row.etnia);
	};

	const handleSubmit = async (data) => {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Informe o nome do cliente'),
				email: Yup.string().email('Formato de email invalido'),
				address: Yup.object().shape({
					street: Yup.string().required('Rua obrigatoria'),
					neighborhood: Yup.string().required('Bairro obrigatorio'),
					city: Yup.string().required('Cidade obrigatoria'),
					state: Yup.string().required('Estado obrigatoria'),
				}),
				contact: Yup.string().required('Informe ao menos um contato'),
			});
			await schema.validate(data, { abortEarly: false });
			const sendData = new FormData();
			sendData.append('thumbnail', data.thumbnail || null);
			sendData.append('name', data.name);
			sendData.append('instagram', data.instagram);
			sendData.append('cpf', data.cpf);
			sendData.append('rg', data.rg);
			sendData.append('email', data.email);
			sendData.append('address', JSON.stringify(data.address));
			sendData.append('occupation', data.occupation);
			sendData.append('contact', data.contact);
			sendData.append('nasc', data.nasc);
			sendData.append('sex', JSON.stringify(data.sex));
			sendData.append('etnia', JSON.stringify(data.etnia));
			editMod ? dispatch(updateClient(sendData, data.id)) : dispatch(saveClient(sendData));
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
		<Fragment>
			<Row>
				<Col m4={4}>
					<p className="title text-center">Cadastro Clientes</p>
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
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Input name="name" label="Nome" style={{ width: '60%' }} maxLength={200} />
					</Col>
					<Col md={3}>
						<Input name="email" label="Email" type="email" maxLength={50} />
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<Input name="instagram" label="Instagram" maxLength={50} />
					</Col>
					<Col md={3}>
						<Input
							name="cpf"
							label="CPF"
							style={{ width: '60%' }}
							placeholder="XXXXXXXXXXX"
							maxLength={11}
						/>
					</Col>
					<Col md={3}>
						<Input
							name="contact"
							label="Telefone"
							style={{ width: '60%' }}
							placeholder="XX XXXXX-XXXX"
							maxLength={12}
						/>
					</Col>

					<Col md={3}>
						<Input
							name="nasc"
							label="Nascimento"
							style={{ width: '60%' }}
							placeholder="XX/XX/XXXX"
							maxLength={9}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Input name="address.street" label="Endereço" style={{ width: '80%' }} maxLength={200} />
					</Col>
					<Col md={3}>
						<Input name="address.neighborhood" label="Bairro" maxLength={100} />
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<Input name="address.city" label="Cidade" maxLength={50} />
					</Col>

					<Col md={3}>
						<Input name="address.state" label="Estado" maxLength={2} style={{ width: '20%' }} />
					</Col>
					<Col md={3}>
						<Input name="address.cep" label="CEP" style={{ width: '50%' }} maxLength={10} />
					</Col>
				</Row>

				<Row>
					<Col md={3}>
						<Select
							label="Sexo"
							name="sex"
							options={[
								{ value: 0, label: 'Masculino' },
								{ value: 1, label: 'Feminino' },
							]}
						/>
					</Col>
					<Col md={3}>
						<Select
							label="Etnia"
							name="etnia"
							options={[
								{ value: 0, label: 'Branco' },
								{ value: 1, label: 'Pardo' },
								{ value: 2, label: 'Negro' },
								{ value: 3, label: 'Amarelo' },
								{ value: 4, label: 'Indigena' },
							]}
						/>
					</Col>
					<Col md={6}>
						<Input name="occupation" label="Profissao" style={{ width: '50%' }} maxLength={50} />
					</Col>
				</Row>

				<Row>
					<Col md={12} className="text-right">
						<Button type="submit" variant="primary">
							{editMod ? 'Atualizar' : 'Salvar'}
						</Button>
						<Button variant="danger" onClick={() => window.location.reload()}>
							Cancela
						</Button>
					</Col>
				</Row>
			</Form>
			<Row>
				<Col md={12} className="my-4">
					<Table rowSelect={rowSelect} data={items} />
				</Col>
			</Row>
		</Fragment>
	);
};

export default withRouter(Client);
