import React from 'react';
import './styles.css';

const Footer = () => {
	return (
		<nav className="navbar navbar-expand-sm fixed-bottom text-white-50 text-center">
			<div className="container justify-content-center text-center text-white">
				<small>Copyright &copy; {new Date().getFullYear()} PodoFeet by Marcus</small>
			</div>
		</nav>
	);
};

export default Footer;
