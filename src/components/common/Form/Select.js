import React, { useEffect, useRef } from 'react';
import ReactSelect, { createFilter } from 'react-select';
import { useField } from '@unform/core';
import classnames from 'classnames';
import './styles.css';

const Select = ({ name, label, disabled, ...rest }) => {
	const selectRef = useRef(null);
	const { fieldName, registerField, defaultValue, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: selectRef.current,
			path: 'state.value',
			getValue: (ref) => {
				if (rest.isMulti) {
					if (!ref.state.value) {
						return [];
					}
					return ref.state.value;
				} else {
					if (!ref.state.value) {
						return '';
					}
					return ref.state.value;
				}
			},
		});
	}, [fieldName, registerField, rest.isMulti]);

	return (
		<div className="form-group">
			<label>{label}</label>
			<ReactSelect
				ref={selectRef}
				placeholder="Selecione..."
				className={classnames({ 'border border-danger is-invalid': error })}
				defaultValue={defaultValue}
				classNamePrefix="react-select"
				filterOption={createFilter({ ignoreAccents: false })}
				{...rest}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default Select;
