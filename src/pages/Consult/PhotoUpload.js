import React, { useRef, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FileUpload, Input, Modal, Tooltip, OverlayTrigger } from '../../components/common/Form';
import { MdAddAPhoto } from 'react-icons/md';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import axios from 'axios';

const PhotoUpload = ({ id }) => {
	const [show, setShow] = useState(false);

	const formRef = useRef(null);

	const handleSubmit = async (data, { reset }) => {
		try {
			const schema = Yup.object().shape({});
			const sendData = new FormData();
			sendData.append('file', data.file);
			sendData.append('description', data.description);
			const response = await axios.post(`/consults/${id}/photos`, sendData);
			console.log(response);
		} catch (error) {
			const { data } = error.response;
			const errorMessages = {};
			errorMessages[data.path] = data.message;
			formRef.current.setErrors(errorMessages);
		}
	};

	return (
		<>
			<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Adicionar Fotos</Tooltip>}>
				<button className="btn btn-link" onClick={() => setShow(true)}>
					<MdAddAPhoto size={24} />
				</button>
			</OverlayTrigger>

			<Modal size="lg" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Adicionar Fotos</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form ref={formRef} onSubmit={handleSubmit}>
						<Row>
							<Col md={3}>
								<FileUpload name="file" />
							</Col>
						</Row>
						<Row>
							<Col md={3}>
								<Input name="description" />
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

export default PhotoUpload;
