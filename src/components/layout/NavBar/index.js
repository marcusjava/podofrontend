import React from 'react';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';
import Logo from '../../../images/Ellipse 1.png';
import { Link } from 'react-router-dom';
import './styles.css';
import { LinkContainer } from 'react-router-bootstrap';
import { FaHome, FaTools, FaNewspaper, FaKey, FaUsers, FaBriefcaseMedical, FaUserShield } from 'react-icons/fa';
import { GiMorgueFeet, GiWreckingBall } from 'react-icons/gi';
import { FiLogOut, FiAlertTriangle } from 'react-icons/fi';
import InputFilter from '../../client/InputFilter';

const NavBar = () => {
	const { credentials } = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	return (
		<Navbar variant="dark" expand="lg">
			<Navbar.Brand href="#home">
				<img src={Logo} alt="Logo" width="35" height="35" className="d-inline-block align-top" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<LinkContainer to="/inicio/principal" className="text-white">
						<Nav.Link active={false}>
							<FaHome /> Home
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/inicio/clientes" className="text-white">
						<Nav.Link active={false}>
							<GiMorgueFeet /> Clientes
						</Nav.Link>
					</LinkContainer>

					<LinkContainer to="/inicio/consultas" className="text-white">
						<Nav.Link active={false}>
							<FaBriefcaseMedical /> Consultas
						</Nav.Link>
					</LinkContainer>

					<NavDropdown
						title={
							<span>
								<FaUserShield /> Administrador
							</span>
						}
					>
						<NavDropdown.Divider />
						<NavDropdown.Item as={Link} to="/inicio/administrador/usuario">
							<FaUsers /> Usuarios
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item as={Link} to="/inicio/administrador/servico">
							<FaTools /> Serviços
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item as={Link} to="/inicio/administrador/procedimento">
							<FaNewspaper /> Procedimentos
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item as={Link} to="/inicio/administrador/logs">
							<FiAlertTriangle /> Logs de Alterações
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href={process.env.REACT_APP_LOG_URL} target="_blank">
							<GiWreckingBall /> Logs de Erros
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<InputFilter />
				</Form>

				<NavDropdown
					title={
						<span>
							<img
								style={{ width: '40px', height: '40px', borderRadius: 50, padding: 0, margin: 0 }}
								src={credentials.avatar_url}
								alt="user pic"
							/>
						</span>
					}
					id="basic-nav-dropdown"
					alignRight
				>
					<NavDropdown.Item>{credentials.name}</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item as={Link} to="/inicio/administrador/usuario/pwd_change">
						<FaKey /> Alterar Senha
					</NavDropdown.Item>

					<NavDropdown.Divider />
					<NavDropdown.Item onClick={() => dispatch(logout())}>
						<FiLogOut /> Sair
					</NavDropdown.Item>
				</NavDropdown>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
