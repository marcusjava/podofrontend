import React from 'react';
import './styles.css';

const Footer = () => {
	return (
		<footer>
			<div className="container-fluid justify-content-center text-center text-white">
				<small>{new Date().getFullYear()} Clinica Nana Podologia</small>
			</div>
		</footer>
	);
};

export default Footer;
