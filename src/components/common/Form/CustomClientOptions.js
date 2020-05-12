import React from 'react';

import { components } from 'react-select';

const CustomClientOptions = (props) => {
	const { data } = props;
	return (
		<components.Option {...props}>
			<img src={data.avatar} alt="Perfil" style={{ width: '40px', height: '40px', borderRadius: 50 }} />
			<label className="ml-1">{data.label}</label>
		</components.Option>
	);
};

export default CustomClientOptions;
