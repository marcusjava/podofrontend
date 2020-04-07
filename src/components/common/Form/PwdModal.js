import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaUnlockAlt } from 'react-icons/fa';
import { Form } from '@unform/web';
import Input from './Input';
import axios from 'axios';
import * as Yup from 'yup';
import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import { change_pwd } from '../../../redux/actions/userActions';

const PwdModal = ({ id }) => {
	const formRef = useRef(null);
	const [show, setShow] = useState(false);

	const dispatch = useDispatch();
	const { success } = useSelector(state => state.user.user);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (success) {
			handleClose();
		}
	}, [success]);

	const handleSubmit = async () => {
		const data = formRef.current.getData();

		try {
			const schema = Yup.object().shape({
				password: Yup.string()
					.required('Senha obrigatoria!')
					.oneOf([Yup.ref('password2'), null], 'Senhas não conferem!'),
				password2: Yup.string().required('Informe confirmação de senha'),
			});
			await schema.validate(data, { abortEarly: false });
			dispatch(change_pwd(data, id));
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errorMessages = {};
				error.inner.forEach(erro => {
					errorMessages[erro.path] = erro.message;
					formRef.current.setErrors(errorMessages);
				});
			}
		}
	};

	return (
		<>
			<button className="btn btn-link" onClick={handleShow}>
				<FaUnlockAlt />
			</button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Alterar a senha </Modal.Title>
				</Modal.Header>
				<Form ref={formRef}>
					<Modal.Body>
						<Input type="password" label="Senha" name="password" />
						<Input type="password" label="Confirma Senha" name="password2" />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={handleSubmit}>
							Salvar
						</Button>
						<Button variant="secondary" onClick={handleClose}>
							Sair
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default PwdModal;
