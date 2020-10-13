import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Form } from '@unform/web';
import { Input } from '../../components/common/Form';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const PwdChange = () => {
	const [show, setShow] = useState(true);

	const formRef = useRef(null);

	const {
		credentials: { id },
	} = useSelector((state) => state.user.user);

	const history = useHistory();

	const handleSubmit = async (data, { reset }) => {
		try {
			const schema = Yup.object().shape({
				password: Yup.string()
					.required('Senha obrigatoria!')
					.oneOf([Yup.ref('password2'), null], 'Senhas não conferem!'),
				password2: Yup.string().required('Informe confirmação de senha'),
			});
			await schema.validate(data, { abortEarly: false });
			try {
				const response = await axios.put(`/users/${id}/change_pwd`, data);
				if (response.status === 200) {
					toastr.success('Senha alterada com sucesso');
					setShow(false);
					history.push('/inicio/principal');
				}
			} catch (error) {
				console.log(error);
			}
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
	const onCancel = () => {
		setShow(false);
		history.push('/inicio/principal');
	};

	return (
		<Modal size="sm" show={show} onHide={onCancel} centered>
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
							<Button variant="danger" onClick={onCancel}>
								Cancelar
							</Button>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default PwdChange;
