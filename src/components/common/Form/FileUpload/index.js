import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useField } from '@unform/core';
import camera from '../../../../images/camera.svg';
import './styles.css';

const FileUpload = ({ name, ...rest }) => {
	const inputRef = useRef(null);

	const { fieldName, registerField, defaultValue } = useField(name);
	const [preview, setPreview] = useState(defaultValue);

	const handlePreview = useCallback(e => {
		const file = e.target.files[0];
		console.log(preview);
		if (!file) {
			setPreview(null);
		}
		const previewUrl = URL.createObjectURL(file);
		setPreview(previewUrl);
	}, []);

	// const handlePreview = useMemo(() => {
	// 	return preview ? URL.createObjectURL(preview) : defaultValue;
	// }, [preview]);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'files[0]',
			clearValue: ref => {
				ref.value = '';
				setPreview(null);
			},
			setValue: value => {
				setPreview(value);
			},
		});
	}, [fieldName, registerField]);

	return (
		<label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={preview ? 'has-thumbnail' : ''}>
			<input type="file" ref={inputRef} onChange={handlePreview} defaultValue={defaultValue} {...rest} />
			<img src={camera} alt="camera" />
		</label>
	);
};

export default FileUpload;
