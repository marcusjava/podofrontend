import React, { useRef, useEffect } from 'react';
import './styles.css';
import Logo from '../../images/Logo2.png';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import { withRouter, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { Input } from '../../components/common/Form';
import * as Yup from 'yup';

const Login = () => {
	const formRef = useRef(null);
	const { authenticated, error } = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		if (authenticated) {
			history.push('/inicio/principal');
		}
	}, [authenticated, history]);

	useEffect(() => {
		if (error) {
			const errorMessages = {};
			errorMessages[error.path] = error.message;
			formRef.current.setErrors(errorMessages);
		}
	}, [error]);

	const handleSubmit = async (data, { reset }) => {
		try {
			const schema = Yup.object().shape({
				email: Yup.string().email('Formato de email incorreto').required('Informe o nome de usuario'),
				password: Yup.string().required('Informe a senha'),
			});
			await schema.validate(data, { abortEarly: false });
			dispatch(login(data, history));
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const messages = {};
				error.inner.forEach((erro) => {
					messages[erro.path] = erro.message;
					formRef.current.setErrors(messages);
				});
			}
		}
		//login(data, history);
	};

	return (
		<div className="login">
			<div className="dark-overlay login-inner text-light">
				<Container>
					<Row className="justify-content-center" style={{ marginTop: '50px' }}>
						<Col md={4}>
							<Row className="justify-content-center">
								<img src={Logo} className="logo" alt="Logo" />
							</Row>

							<Form ref={formRef} onSubmit={handleSubmit}>
								<Input name="email" label="Email" />
								<Input type="password" name="password" label="Senha" />
								<button type="submit" className="btn btn-info btn-block mt-4">
									Entrar
								</button>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default Login;
