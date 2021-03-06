import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';

const PhotoList = ({ photos, handleDeletePhoto, width = '503px', height = '339px' }) => {
	return (
		<Row>
			{photos.map((photo) => (
				<Col md={4} key={photo._id}>
					<Card style={{ width }}>
						<a href={photo.url} target="_blank" rel="noopener noreferrer">
							<Card.Img variant="top" src={photo.url} style={{ width, height }} />
						</a>

						<Card.Body>
							<Card.Text>
								<strong>{photo.name}</strong>
								<button className="btn btn-link" onClick={(e) => handleDeletePhoto(e, photo._id)}>
									<FaTrashAlt />
								</button>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

PhotoList.propTypes = {
	photos: PropTypes.array.isRequired,
};

export default PhotoList;
