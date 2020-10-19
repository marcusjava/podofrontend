import React from 'react';
import spinner from '../../images/gifs/spinner2.gif';

const Spinner = ({ width = 200 }) => {
	return (
		<div className="container h-100">
			<div className="row h-100 justify-content-center align-items-center">
				<img src={spinner} alt="Loading" style={{ width: width, margin: 'auto', display: 'block' }} />
			</div>
		</div>
	);
};

export default Spinner;
