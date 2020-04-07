import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, DatePicker } from '../../components/common/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { IoIosSearch } from 'react-icons/io';
import { consults } from '../../redux/actions/consultActions';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import './styles.css';

dayjs.extend(utc);

const DateFilter = () => {
	const formDateRef = useRef(null);
	const dispatch = useDispatch();

	const handleSubmit = async (data, { reset }) => {
		const dateI = data.dateI && dayjs(data.dateI).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		const dateF = data.dateF && dayjs(data.dateF).format('YYYY-MM-DDTHH:mm:ss.sssZ');
		dispatch(consults(dateI, dateF));
	};

	return (
		<Form ref={formDateRef} className="form-inline" onSubmit={handleSubmit}>
			<DatePicker
				placeholderText="Data Inicial"
				onChangeRaw={event => console.log(event.target.value)}
				fixedHeight
				className="only-hour"
				name="dateI"
				isClearable={true}
				dateFormat="dd/MM/yyyy"
			/>

			<DatePicker
				placeholderText="Data Final"
				fixedHeight
				className="only-hour"
				name="dateF"
				isClearable={true}
				dateFormat="dd/MM/yyyy"
			/>
			<Button type="submit" size="sm">
				<IoIosSearch />
			</Button>
		</Form>
	);
};

export default DateFilter;
