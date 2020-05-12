import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

const CheckBox = ({ name, info, label, disabled, ...rest }) => {
	const inputRef = useRef(null);

	const { fieldName, defaultValue, registerField, error } = useField(name);
	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'checked',
		});
	}, [fieldName, registerField, defaultValue]);
	return (
		<div className="form-check-inline">
			<label className="form-check-label">
				<input
					type="checkbox"
					{...rest}
					ref={inputRef}
					defaultChecked={defaultValue}
					className="form-check-input"
				/>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
