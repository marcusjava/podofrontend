import React, { useEffect, useRef } from 'react';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';
import classnames from 'classnames';

const InputMask = ({ name, info, label, disabled, ...rest }) => {
	const inputRef = useRef(null);
	const { fieldName, defaultValue, registerField, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
			setValue(ref, value) {
				ref.value = value;
			},

			clearValue(ref) {
				ref.value = '';
			},
		});
	}, [fieldName, registerField]);
	return (
		<div className="form-group">
			{label && <label htmlFor={fieldName}>{label}</label>}
			<ReactInputMask
				id={fieldName}
				ref={inputRef}
				className={classnames('form-control form-control-sm', { 'is-invalid': error })}
				defaultValue={defaultValue}
				{...rest}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default InputMask;
