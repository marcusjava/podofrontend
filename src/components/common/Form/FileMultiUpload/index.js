import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import classnames from 'classnames';

const FileMultiUpload = ({ name, info, label, disabled, ...rest }) => {
	const inputRef = useRef(null);
	const { fieldName, registerField, defaultValue, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'files',
			getValue(ref) {
				return ref.files && Array.from(ref.files);
			},
			clearValue(ref) {
				ref.value = '';
			},
		});
	}, [fieldName, registerField]);

	return (
		<div className="form-group">
			<label htmlFor={fieldName}>Selecione as fotos</label>
			<input
				id={fieldName}
				className={classnames('form-control-file', { 'is-invalid': error })}
				multiple
				type="file"
				ref={inputRef}
				{...rest}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default FileMultiUpload;
