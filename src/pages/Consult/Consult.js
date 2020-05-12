import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { Row, Col, Button, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { DatePicker, TextArea, Select, CheckBox, Input, FileMultiUpload } from '../../components/common/Form';
import * as Yup from 'yup';
import { Procedures } from '../../redux/actions/procedureActions';
import { useParams } from 'react-router-dom';
import { Scope } from '@unform/core';
import { Form } from '@unform/web';
import { parseISO } from 'date-fns';
import './styles.css';
import CalosJSON from './CalosJSON';
import Spinner from '../../components/common/Spinner';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import PhotoList from '../../components/consult/PhotoList';
import { Link } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
dayjs.extend(utc);

const NOMENCLATURA_DEDOS_PE = [
	{ label: 'Pé direito ', value: 0 },
	{ label: 'Halux direito ', value: 1 },
	{ label: 'Arteiro 1 direito ', value: 2 },
	{ label: 'Arteiro 2 direito ', value: 3 },
	{ label: 'Arteiro 3 direito ', value: 4 },
	{ label: 'Arteiro 4 direito ', value: 5 },
	{ label: 'Pé esquerdo ', value: 6 },
	{ label: 'Halux esquerdo ', value: 7 },
	{ label: 'Arteiro 1 esquerdo ', value: 8 },
	{ label: 'Arteiro 2 esquerdo ', value: 9 },
	{ label: 'Arteiro 3 esquerdo ', value: 10 },
	{ label: 'Arteiro 4 esquerdo ', value: 11 },
];

const TIPOS_DE_PES = [
	{ label: 'Pé Normal direito ', value: 0 },
	{ label: 'Pé Normal esquerdo ', value: 1 },
	{ label: 'Pé Cavo direito ', value: 2 },
	{ label: 'Pé Cavo esquerdo ', value: 3 },
	{ label: 'Pé Plano direito ', value: 4 },
	{ label: 'Pé Plano esquerdo ', value: 5 },
];

const TIPOS_PISADA_PES = [
	{ label: 'Pé Pronado direito ', value: 0 },
	{ label: 'Pé Pronado esquerdo ', value: 1 },
	{ label: 'Pé Neutro direito ', value: 2 },
	{ label: 'Pé Neutro esquerdo ', value: 3 },
	{ label: 'Pé Supinado direito ', value: 4 },
	{ label: 'Pé Supinado esquerdo ', value: 5 },
];

const TIPOS_JOELHOS = [
	{ label: 'Joelho Normal ', value: 'Joelho Normal ' },
	{ label: 'Joelho Valgo ', value: 'Joelho Valgo ' },
	{ label: 'Joelho Varo ', value: 'Joelho Varo' },
];

const TIPOS_DEDOS = [
	{ label: 'Dedo Egipcio', value: 'Dedo Egipcio ' },
	{ label: 'Dedo Romano ', value: 'Dedo Romano ' },
	{ label: 'Dedo Grego ', value: 'Dedo Grego' },
	{ label: 'Dedo Alemão ', value: 'Dedo Alemão' },
	{ label: 'Dedo Celtico ', value: 'Dedo Celtico' },
];

const Consult = () => {
	const formRef = useRef(null);
	const dispatch = useDispatch();
	const { id } = useParams();
	const history = useHistory();
	const [item, setItem] = useState({});
	const [photos, setPhotos] = useState([]);

	const { options } = useSelector((state) => state.procedure.procedures);

	useEffect(() => {
		dispatch(Procedures());
		async function getConsult() {
			const response = await axios.get(`/consults/${id}`);
			setItem(response.data);
		}

		getConsult();
	}, [dispatch, id]);

	async function getPhotos() {
		const response = await axios.get(`/photos/${id}`);
		setPhotos(response.data);
	}

	useEffect(() => {
		getPhotos();
	}, []);

	const handleUpload = async (file) => {
		const fileData = new FormData();
		fileData.append('photo', file);
		try {
			const response = await axios.post(`/photos/${id}`, fileData);
			setPhotos([...photos, response.data]);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	const handleDeletePhoto = async (e, id) => {
		e.preventDefault();
		try {
			await axios.delete(`/photos/${id}`);
			setPhotos(photos.filter((photo) => photo._id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (data) => {
		try {
			const schema = Yup.object().shape({
				date: Yup.string().required('Informe a data da consulta'),
				procedures: Yup.string().ensure().required('Informe os procedimentos'),
				type_consult: Yup.string().ensure().required('Informe o tipo de consulta'),
			});
			await schema.validate(data, { abortEarly: false });

			const sendData = {
				date: dayjs(data.date).format('YYYY-MM-DD HH:mm:ss'),
				client: data.client,
				procedures: data.procedures.map((procedure) => procedure.value),
				type_consult: data.type_consult,
				observations: data.observations,
				anamnese: data.anamnese,
				status: { value: '1', label: 'Realizada' },
			};
			try {
				const dialog = window.confirm('Tem certeza que deseja encerrar a consulta?');

				if (dialog === true) {
					data.files.forEach(handleUpload);
					const response = await axios.put(`/consults/${data._id}`, sendData);
					if (response.status === 200) {
						console.log(response.status);
						toastr.success('Consulta atualizada com sucesso');
						history.push('/inicio/principal');
					}
				}
			} catch (error) {
				const { data } = error.response;
				const errorMessages = {};
				errorMessages[data.path] = data.message;
				formRef.current.setErrors(errorMessages);
			}
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errorMessages = {};
				error.inner.forEach((erro) => {
					errorMessages[erro.path] = erro.message;
					formRef.current.setErrors(errorMessages);
				});
			}
		}
	};

	return Object.entries(item).length === 0 ? (
		<Spinner />
	) : (
		<Form
			ref={formRef}
			initialData={{
				_id: item._id,
				date: parseISO(item.date),
				client: item.client._id,
				procedures: item.procedures.map((procedure) => ({
					value: procedure._id,
					label: procedure.name,
				})),
				anamnese: item.anamnese,
				type_consult: item.type_consult,
				status: item.status,
				observations: item.observations,
			}}
			onSubmit={handleSubmit}
		>
			<Input type="hidden" name="_id" />
			<Input type="hidden" name="client" />
			<Row className="justify-content-center mb-4">
				<Col md={4} className="text-center">
					<Image className="rounded-img mt-2" roundedCircle src={item.client && item.client.avatar_url} />
					<p className="title text-center">{item.client && item.client.name}</p>
				</Col>
			</Row>
			<Row>
				<Col className="text-right">
					{item.status.value === '1' && (
						<OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Imprimir Ficha</Tooltip>}>
							<Link to={`/ficha/${item.id}`}>
								<FaPrint size={30} />
							</Link>
						</OverlayTrigger>
					)}
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<DatePicker placeholderText="Data/hora" name="date" />
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<Select label="Procedimentos" isMulti name="procedures" options={options} />
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<Select
						label="Tipo consulta"
						name="type_consult"
						options={[
							{ value: 0, label: 'Agendada' },
							{ value: 1, label: 'Retorno' },
							{ value: 2, label: 'Urgência' },
						]}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<TextArea rows={10} col={15} label="Observações" name="observations" />
				</Col>
			</Row>

			<Row>
				<Col md={12}>
					<FileMultiUpload name="files" />
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					{photos.length === 0 ? (
						<p className="text-center text-muted">Sem fotos</p>
					) : (
						<PhotoList photos={photos} handleDeletePhoto={handleDeletePhoto} />
					)}
				</Col>
			</Row>

			<div className="border border-primary bg-light p-3" style={{ marginTop: '60px' }}>
				<Scope path="anamnese">
					<Row>
						<Col md={12}>
							<TextArea label="Descrição Procedimentos" name="desc_proc" rows={10} col={15} />
						</Col>
					</Row>
					<Row className="my-3">
						<Col md={3} className="form-inline">
							<div className="form-group">
								<CheckBox name="esporte.option" label="Esportes?" />
								<Select
									label="Qt"
									name="esporte.qt"
									options={[
										{ value: 0, label: '0' },
										{ value: 1, label: '1' },
										{ value: 2, label: '2' },
										{ value: 3, label: '3' },
										{ value: 4, label: '4' },
										{ value: 5, label: '5' },
										{ value: 6, label: '6' },
										{ value: 7, label: '7' },
									]}
								/>
							</div>
						</Col>
						<Col md={3}>
							<div className="form-group">
								<Select
									label="Canhoto/Destro?"
									name="pe_predominante"
									options={[
										{ value: 0, label: 'Destro' },
										{ value: 1, label: 'Canhoto' },
									]}
								/>
							</div>
						</Col>

						<Col md={2} className="form-inline">
							<Input
								name="calcado.num"
								label="Num calçado"
								className="mr-3"
								style={{ width: '40px' }}
								maxLength={2}
							/>
						</Col>
						<Col md={2}>
							<Select
								label="Tipo"
								name="calcado.tipo"
								options={[
									{ value: 0, label: 'Alto' },
									{ value: 1, label: 'Bota' },
									{ value: 2, label: 'Confort' },
								]}
							/>
						</Col>
						<Col md={2}>
							<Select
								label="Material"
								name="calcado.material"
								options={[
									{ value: 0, label: 'Sintetico' },
									{ value: 1, label: 'Couro' },
									{ value: 2, label: 'Confort' },
								]}
							/>
						</Col>
					</Row>
					<Row className="my-3">
						<Col md={6} className="form-inline">
							<CheckBox name="medicamento.option" label="Medicamento?" />
							<Input
								name="medicamento.description"
								label="Quais?"
								style={{ width: '500px' }}
								maxLength={50}
							/>
						</Col>
						<Col md={6} className="form-inline">
							<CheckBox name="alergia.option" label="Alergia?" />
							<Input
								name="alergia.description"
								label="Quais?"
								style={{ width: '500px' }}
								maxLength={50}
							/>
						</Col>
					</Row>
					<Row className="my-3">
						<Col md={6} className="form-inline">
							<CheckBox name="doenca.option" label="Doença?" />
							<Input name="doenca.description" label="Quais?" style={{ width: '500px' }} maxLength={50} />
						</Col>
						<Col md={6} className="form-inline">
							<CheckBox name="diabetico" label="Diabetico?" />
							<CheckBox name="diabetico_familia" label="Diabetico familia?" />
							<CheckBox name="hipertensao" label="Hipertenso?" />
							<CheckBox name="cardiopata" label="Cardiopata?" />
						</Col>
					</Row>
					<Row className="my-3">
						<Col md={6} className="form-inline">
							<CheckBox name="fumante" label="Fumante?" />
							<CheckBox name="etilista" label="Etilista?" />
							<CheckBox name="dst" label="DST?" />
						</Col>
						<Col md={6} className="form-inline">
							<CheckBox name="grav_lact" label="Gravidez/Lactação?" />
							<Input name="outros" label="Outros?" style={{ width: '500px' }} maxLength={50} />
						</Col>
					</Row>
					<Row className="my-3">
						<Col md={6}>
							<TextArea rows={5} col={20} label="Motivo visita" name="motivo" />
						</Col>
					</Row>
					<Row>
						<Col>
							<p className="subtitle">Formato das Unhas</p>
						</Col>
					</Row>
					<Scope path="unhas_formato">
						<Row>
							<Col md={2} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/formato_unhas/normal.png')} />
								</div>

								<Select label="Unhas Normais" isMulti name="normal" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={2} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/formato_unhas/involuta.png')} />
								</div>

								<Select
									label="Unhas Involutas"
									isMulti
									name="involuta"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={2} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/formato_unhas/telha.png')} />
								</div>

								<Select label="Unhas em Telha" isMulti name="telha" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={2} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/formato_unhas/funil.png')} />
								</div>

								<Select label="Unhas em Funil" isMulti name="funil" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={2} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/formato_unhas/gancho.png')} />
								</div>

								<Select label="Unhas em Gancho" isMulti name="gancho" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={2} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/formato_unhas/caracol.png')} />
								</div>

								<Select
									label="Unhas em Caracol"
									isMulti
									name="caracol"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={2} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/formato_unhas/torques.png')} />
								</div>

								<Select
									label="Unhas em Torquês"
									isMulti
									name="torques"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
						</Row>
					</Scope>

					<Row>
						<Col>
							<p className="subtitle">Lesões nas Unhas</p>
						</Col>
					</Row>
					<Scope path="unhas_lesoes">
						<Row>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/onicoatrofia2.jpg')} />
								</div>

								<Select
									label="Onicoatrofia"
									isMulti
									name="onicoatrofia"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/onicorrexe.png')} />
								</div>

								<Select label="Onicorrexe" isMulti name="onicorrexe" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/onicogrifose.jpg')} />
								</div>

								<Select
									label="Onicogrifose"
									isMulti
									name="onicogrifose"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/onicolise.jpg')} />
								</div>

								<Select label="Onicolise" isMulti name="onicolise" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/onicomicose.jpg')} />
								</div>

								<Select
									label="Onicomicose"
									isMulti
									name="onicomicose"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/psoriase.jpg')} />
								</div>

								<Select label="Psoriase" isMulti name="psoriase" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/onicocriptose.jpg')} />
								</div>

								<Select
									label="Onicocriptose"
									isMulti
									name="onicocriptose"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/granuloma.jpg')} />
								</div>

								<Select label="Granuloma" isMulti name="granuloma" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/alteracao_cor.jpeg')} />
								</div>

								<Select
									label="Alteração de Cor"
									isMulti
									name="alter_cor"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/onicofose.jpg')} />
								</div>

								<Select label="Onicofose" isMulti name="onicofose" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/exostose.png')} />
								</div>

								<Select label="Exostose" isMulti name="exostose" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_unhas/onicomadese.png')} />
								</div>

								<Select
									label="Onicomadese"
									isMulti
									name="onicomadese"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<TextArea rows={5} col={20} label="Outras lesões unhas" name="outros" />
							</Col>
						</Row>
					</Scope>
					<Row>
						<Col>
							<p className="subtitle">Lesões na Pele</p>
						</Col>
					</Row>
					<Scope path="pele_lesoes">
						<Row>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/bromidrose.jpg')} />
								</div>

								<Select label="Bromidrose" isMulti name="bromidrose" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/anidrose.jpg')} />
								</div>

								<Select label="Anidrose" isMulti name="anidrose" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/hiperhidrose.jpg')} />
								</div>

								<Select
									label="Hiperhidrose"
									isMulti
									name="hiperhidrose"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/isquemia.png')} />
								</div>

								<Select label="Isquemia" isMulti name="isquemia" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/tinea_pedis.jpg')} />
								</div>

								<Select
									label="Tinea Pedis"
									isMulti
									name="tinea_pedis"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/fissuras.jpg')} />
								</div>

								<Select label="Fissuras" isMulti name="fissuras" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/desidrose.jpg')} />
								</div>

								<Select label="Desidrose" isMulti name="desidrose" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/mal_perfurante.jpg')} />
								</div>

								<Select
									label="Mal Perfurante"
									isMulti
									name="mal_perfurante"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/psoriase.jpg')} />
								</div>

								<Select label="Psoriase" isMulti name="psoriase" options={NOMENCLATURA_DEDOS_PE} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_pele/calos.jpg')} />
								</div>

								<Select label="Calos" isMulti name="calos" options={CalosJSON} />
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<TextArea rows={5} col={20} label="Outras lesões pele" name="outros" />
							</Col>
						</Row>
					</Scope>
					<Row>
						<Col>
							<p className="subtitle">Lesões na Ortopedicas</p>
						</Col>
					</Row>
					<Scope path="orto_lesoes">
						<Row>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_ortopedicas/halux_valgus.jpg')} />
								</div>

								<Select
									label="Halux Valgus"
									isMulti
									name="halux_valgus"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_ortopedicas/halux_rigidus.jpg')} />
								</div>

								<Select
									label="Halux Rigidus"
									isMulti
									name="halux_rigidus"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_ortopedicas/esporao_calcaneo.jpeg')} />
								</div>

								<Select
									label="Esporão Calcaneo"
									isMulti
									name="esporao_calcaneo"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_ortopedicas/dedos_garra.png')} />
								</div>

								<Select
									label="Dedos em Garra"
									isMulti
									name="dedos_garra"
									options={NOMENCLATURA_DEDOS_PE}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_ortopedicas/tipo_pe.jpg')} />
								</div>

								<Select label="Tipo de Pé" isMulti name="tipo_pe" options={TIPOS_DE_PES} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_ortopedicas/tipos_de_pisada.jpg')} />
								</div>

								<Select
									label="Tipo de Pisada"
									isMulti
									name="tipos_de_pisada"
									options={TIPOS_PISADA_PES}
								/>
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_ortopedicas/tipos_joelhos.jpg')} />
								</div>

								<Select label="Tipos de Joelhos" name="tipos_joelho" options={TIPOS_JOELHOS} />
							</Col>
							<Col md={3} className="text-center">
								<div className="mb-2">
									<Image src={require('../../images/lesoes_ortopedicas/tipos_dedos_pe.jpg')} />
								</div>

								<Select label="Tipos de Dedos" name="tipos_dedos" options={TIPOS_DEDOS} />
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<TextArea rows={5} col={20} label="Outras lesões ortopedicas" name="outros" />
							</Col>
						</Row>
					</Scope>
					<Row>
						<Col>
							<p className="subtitle">Exame fisico</p>
						</Col>
					</Row>
					<Row>
						<Scope path="exame_fisico">
							<Col md={3}>
								<Input label="Monofilamento" name="monofilamento" maxLength={20} />
							</Col>
							<Col md={3}>
								<Input label="Diapasão" name="diapasao" maxLength={20} />
							</Col>
							<Col md={3}>
								<Input label="Digitopressão" name="digitopressao" maxLength={20} />
							</Col>
							<Col md={3}>
								<Input label="Pulsos" name="pulsos" maxLength={10} />
							</Col>
						</Scope>
					</Row>
				</Scope>
			</div>
			<Row>
				<Col md={12} className="text-right mt-4">
					<Button type="submit" variant="primary">
						Salvar
					</Button>
					<Button variant="danger">Cancelar</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default Consult;
