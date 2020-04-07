import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ label, style, name, placeholder, value, error, info, type, onChange, disabled }) => {
	return (
		<div className="form-group">
			{label && <label htmlFor={name}>{label}</label>}
			<input
				type={type}
				className={classnames('form-control form-control-sm', { 'is-invalid': error })}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
				style={style}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextFieldGroup.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.string,
	info: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func,
	disabled: PropTypes.string,
	style: PropTypes.object,
};

TextFieldGroup.defaultProps = {
	type: 'text',
};

export default TextFieldGroup;
