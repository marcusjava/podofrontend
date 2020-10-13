import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { FaKey } from 'react-icons/fa';
import { Form } from '@unform/web';
import { Input } from '../../components/common/Form';
import * as Yup from 'yup';

const PwdChange = () => {
	const [show, setShow] = useState(false);

	const formRef = useRef(null);

	const { credentials } = useSelector((state) => state.user.user);

	const handleSubmit = async (data, { reset }) => {
		console.log(credentials);

		try {
			const schema = Yup.object().shape({
				password: Yup.string()
					.required('Senha obrigatoria!')
					.oneOf([Yup.ref('password2'), null], 'Senhas não conferem!'),
				password2: Yup.string().required('Informe confirmação de senha'),
			});
			await schema.validate(data, { abortEarly: false });
			//const response = await axios.put(`/users/${credentials.id}/change_pwd`, data);
			//console.log(response);
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
			<span style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => setShow(true)}>
				<FaKey /> Alterar senha
			</span>

			<Modal size="sm" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Alterar Senha</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form ref={formRef} onSubmit={handleSubmit}>
						<Row>
							<Col>
								<Input type="password" name="password" label="Senha" />
							</Col>
						</Row>
						<Row>
							<Col>
								<Input type="password" name="password2" label="Confirma Senha" />
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
};

export default PwdChange;
