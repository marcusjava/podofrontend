import React from 'react';
import spinner from '../../images/gifs/spinner2.gif';

const Spinner = () => {
	return (
		<div>
			<img src={spinner} alt="Loading" style={{ width: '200px', margin: 'auto', display: 'block' }} />
		</div>
	);
};

export default Spinner;
