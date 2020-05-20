import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useField } from '@unform/core';
import 'react-datepicker/dist/react-datepicker.css';
import classnames from 'classnames';
import br from 'date-fns/locale/pt-BR';

registerLocale('pt-br', br);

const DatePicker = ({ name, label, ...rest }) => {
	const datepickerRef = useRef(null);

	const { fieldName, registerField, defaultValue, error } = useField(name);
	const [date, setDate] = useState(defaultValue || null);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: datepickerRef.current,
			path: 'props.selected',
			clearValue: (ref) => {
				ref.clear();
			},
		});
	}, [fieldName, registerField]);

	return (
		<div className="form-group">
			{label && <label htmlFor={fieldName}>{label}</label>}
			<ReactDatePicker
				id={fieldName}
				className={classnames('form-control form-control-sm', { 'is-invalid': error })}
				ref={datepickerRef}
				selected={date}
				onChange={setDate}
				isClearable={true}
				timeFormat="HH:mm"
				timeIntervals={10}
				showTimeSelect={true}
				timeCaption="Hora"
				dateFormat="dd/MM/yyyy HH:mm"
				minDate={new Date()}
				locale="pt-br"
				{...rest}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default DatePicker;
