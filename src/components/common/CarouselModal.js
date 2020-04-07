import React, { useState } from 'react';
import { Modal, Button, Carousel, Image } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';

const CarouselModal = ({ images }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<button className="btn btn-link" onClick={handleShow}>
				<FaEye />
			</button>
			<Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title>Fotos Procedimento </Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Carousel>
						{images.map((image, idx) => (
							<Carousel.Item key={idx}>
								<Image src={image} fluid style={{ width: '800px', height: '600px' }} />
								<Carousel.Caption>
									<h3>First slide label</h3>
									<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
								</Carousel.Caption>
							</Carousel.Item>
						))}
					</Carousel>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CarouselModal;
