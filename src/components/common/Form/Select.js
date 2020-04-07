import React, { useEffect, useRef } from 'react';
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';
import classnames from 'classnames';

const Select = ({ name, label, disabled, ...rest }) => {
	const selectRef = useRef(null);
	const { fieldName, registerField, defaultValue, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: selectRef.current,
			path: 'state.value',
			getValue: ref => {
				if (rest.isMulti) {
					if (!ref.state.value) {
						return [];
					}
					return ref.state.value.map(option => option.value.toString());
				} else {
					if (!ref.state.value) {
						return '';
					}
					return ref.state.value;
				}
			},
		});
	}, [fieldName, registerField, rest.isMulti, defaultValue]);

	return (
		<div className="form-group">
			<label>{label}</label>
			<ReactSelect
				ref={selectRef}
				className={classnames({ 'border border-danger is-invalid': error })}
				defaultValue={defaultValue}
				classNamePrefix="react-select"
				{...rest}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default Select;
