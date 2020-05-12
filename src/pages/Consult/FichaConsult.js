import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import Spinner from '../../components/common/Spinner';
import Logo2 from '../../images/Logo2.jpg';
import './styles.css';

const FichaConsult = () => {
	const { id } = useParams();

	const [item, setItem] = useState({});
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		async function getConsult() {
			const response = await axios.get(`/consults/${id}`);
			setItem(response.data);
		}

		getConsult();
	}, [id]);

	useEffect(() => {
		async function getPhotos() {
			const response = await axios.get(`/photos/${id}`);
			setPhotos(response.data);
		}
		getPhotos();
	}, []);

	return Object.entries(item).length === 0 ? (
		<Spinner />
	) : (
		<>
			<div className="page">
				<Row className="justify-content-center mb-4">
					<Col md={4} className="text-center">
						<Image className="mt-2" src={Logo2} />
					</Col>
				</Row>
				<Row className="justify-content-right mb-2">
					<Col>
						<p className="text-right">
							<strong>Data/Hora - {dayjs(item.date).format('DD/MM/YYYY HH:mm')}</strong>
						</p>
					</Col>
				</Row>

				<Row className="mt-4">
					<Col>
						<p className="subtitle">Dados pessoais</p>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<p>
							<strong>Nome - </strong>
							{item.client.name}
						</p>
					</Col>
					<Col md={6}>
						<p>
							<strong>Telefone - </strong>
							{item.client.contact}
						</p>
					</Col>
				</Row>
				<Row className="mt-1">
					<Col>
						<p className="subtitle">Procedimentos</p>
					</Col>
				</Row>
				<Row>
					{item.procedures.map((proc, index) => (
						<Col md={6} key={index}>
							<p>- {proc.name}</p>
						</Col>
					))}
				</Row>
				<Row className="mt-1">
					<Col>
						<p className="subtitle">Anamnese</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Descrição</Form.Label>
							<Form.Control as="textarea" rows="6" disabled value={item.anamnese.desc_proc} />
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6} className="form-inline">
						<Form.Check
							label="Esportes?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.esporte.option == true}
						/>
						<label className="mr-2"> Qt - {item.anamnese.esporte.qt.value}</label>
						<Form.Label>Pé predom. - {item.anamnese.pe_predominante.label}</Form.Label>
					</Col>

					<Col md={6} className="form-inline">
						<Form.Label className="mr-2">Num. calçado - {item.anamnese.calcado.num}</Form.Label>
						<Form.Label className="mr-2">Tipo - {item.anamnese.calcado.tipo.label}</Form.Label>
						<Form.Label className="mr-2">Material - {item.anamnese.calcado.material.label}</Form.Label>
					</Col>
				</Row>
				<Row>
					<Col md={6} className="form-inline mt-2">
						<Form.Check
							label="Medicamentos?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.medicamento.option == true}
						/>
						<label className="mr-2"> Quais - {item.anamnese.medicamento.description}</label>
					</Col>
					<Col md={6} className="form-inline mt-2">
						<Form.Check
							label="Alergia?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.alergia.option == true}
						/>
						<label className="mr-2"> Quais - {item.anamnese.alergia.description}</label>
					</Col>
				</Row>

				<Row>
					<Col md={6} className="form-inline mt-2">
						<Form.Check
							label="Doença?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.doenca.option == true}
						/>
						<label className="mr-2"> Quais - {item.anamnese.doenca.description}</label>
					</Col>
					<Col md={6} className="form-inline mt-2">
						<Form.Check
							label="Diabetico?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.diabetico == true}
						/>
						<Form.Check
							label="Diabetico Familia?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.diabetico_familia == true}
						/>
						<Form.Check
							label="Hipertensão?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.hipertensao == true}
						/>
						<Form.Check
							label="Cardiopata?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.cardiopata == true}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={6} className="form-inline mt-2">
						<Form.Check
							label="Fumante?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.fumante == true}
						/>
						<Form.Check
							label="Etilista?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.etilista == true}
						/>
						<Form.Check
							label="DST?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.dst == true}
						/>
					</Col>
					<Col md={6} className="form-inline mt-2">
						<Form.Check
							label="Gravidez/Lactação?"
							type="checkbox"
							readOnly
							className="mr-2"
							checked={item.anamnese.grav_lact == true}
						/>
						<label className="mr-2"> Outros? - {item.anamnese.outros}</label>
					</Col>
				</Row>
				<Row className="mt-2">
					<Col>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Motivo visita</Form.Label>
							<Form.Control as="textarea" rows="3" disabled value={item.anamnese.motivo} />
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div className="page">
				<Row className="justify-content-center mb-4">
					<Col md={4} className="text-center">
						<Image className="mt-2" src={Logo2} />
					</Col>
				</Row>

				<Row className="mt-4">
					<Col>
						<p className="subtitle">Formato Unhas</p>
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_formato.normal.length > 0 && (
							<label className="mr-2">
								{' '}
								Normal - {item.anamnese.unhas_formato.normal.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_formato.involuta.length > 0 && (
							<label className="mr-2">
								{' '}
								Involuta - {item.anamnese.unhas_formato.involuta.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_formato.telha.length > 0 && (
							<label className="mr-2">
								{' '}
								Telha - {item.anamnese.unhas_formato.telha.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_formato.funil.length > 0 && (
							<label className="mr-2">
								{' '}
								Funil - {item.anamnese.unhas_formato.funil.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_formato.gancho.length > 0 && (
							<label className="mr-2">
								{' '}
								Gancho - {item.anamnese.unhas_formato.gancho.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_formato.caracol.length > 0 && (
							<label className="mr-2">
								{' '}
								Caracol - {item.anamnese.unhas_formato.caracol.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_formato.torques.length > 0 && (
							<label className="mr-2">
								{' '}
								Torques - {item.anamnese.unhas_formato.torques.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>

				<Row className="mt-4">
					<Col>
						<p className="subtitle">Lesões Unhas</p>
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.onicoatrofia.length > 0 && (
							<label className="mr-2">
								{' '}
								Onicoatrofia -{' '}
								{item.anamnese.unhas_lesoes.onicoatrofia.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.onicorrexe.length > 0 && (
							<label className="mr-2">
								{' '}
								Onicorrexe - {item.anamnese.unhas_lesoes.onicorrexe.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.onicogrifose.length > 0 && (
							<label className="mr-2">
								{' '}
								Onicogrifose -{' '}
								{item.anamnese.unhas_lesoes.onicogrifose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.onicolise.length > 0 && (
							<label className="mr-2">
								{' '}
								Onicolise - {item.anamnese.unhas_lesoes.onicolise.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.onicomicose.length > 0 && (
							<label className="mr-2">
								{' '}
								Onicomicose - {item.anamnese.unhas_lesoes.onicomicose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.psoriase.length > 0 && (
							<label className="mr-2">
								{' '}
								Psoriase - {item.anamnese.unhas_lesoes.psoriase.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.onicocriptose.length > 0 && (
							<label className="mr-2">
								{' '}
								Onicocriptose -{' '}
								{item.anamnese.unhas_lesoes.onicocriptose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.granuloma.length > 0 && (
							<label className="mr-2">
								{' '}
								Granuloma - {item.anamnese.unhas_lesoes.granuloma.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.alter_cor.length > 0 && (
							<label className="mr-2">
								{' '}
								Alteração Cor - {item.anamnese.unhas_lesoes.alter_cor.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.onicofose.length > 0 && (
							<label className="mr-2">
								{' '}
								Onicofose - {item.anamnese.unhas_lesoes.onicofose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.exostose.length > 0 && (
							<label className="mr-2">
								{' '}
								Exostose - {item.anamnese.unhas_lesoes.exostose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.unhas_lesoes.onicomadese.length > 0 && (
							<label className="mr-2">
								{' '}
								Onicomadese - {item.anamnese.unhas_lesoes.onicomadese.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row className="mt-2">
					<Col>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Outras lesões unhas</Form.Label>
							<Form.Control as="textarea" rows="3" disabled value={item.anamnese.unhas_lesoes.outros} />
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div className="page">
				<Row className="justify-content-center mb-4">
					<Col md={4} className="text-center">
						<Image className="mt-2" src={Logo2} />
					</Col>
				</Row>

				<Row className="mt-4">
					<Col>
						<p className="subtitle">Lesões Pele</p>
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.bromidrose.length > 0 && (
							<label className="mr-2">
								{' '}
								Bromidrose - {item.anamnese.pele_lesoes.bromidrose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.anidrose.length > 0 && (
							<label className="mr-2">
								{' '}
								Anidrose - {item.anamnese.pele_lesoes.anidrose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.hiperhidrose.length > 0 && (
							<label className="mr-2">
								{' '}
								Hiperhidrose - {item.anamnese.pele_lesoes.hiperhidrose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.isquemia.length > 0 && (
							<label className="mr-2">
								{' '}
								Isquemia - {item.anamnese.pele_lesoes.isquemia.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.tinea_pedis.length > 0 && (
							<label className="mr-2">
								{' '}
								Tinea Pedis - {item.anamnese.pele_lesoes.tinea_pedis.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.fissuras.length > 0 && (
							<label className="mr-2">
								{' '}
								Fissuras - {item.anamnese.pele_lesoes.fissuras.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.desidrose.length > 0 && (
							<label className="mr-2">
								{' '}
								Desidrose - {item.anamnese.pele_lesoes.desidrose.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.mal_perfurante.length > 0 && (
							<label className="mr-2">
								{' '}
								Mal perfurante -{' '}
								{item.anamnese.pele_lesoes.mal_perfurante.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.psoriase.length > 0 && (
							<label className="mr-2">
								{' '}
								Psoriase - {item.anamnese.pele_lesoes.psoriase.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.pele_lesoes.calos.length > 0 && (
							<label className="mr-2">
								{' '}
								Calos - {item.anamnese.pele_lesoes.calos.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>

				<Row className="mt-2">
					<Col>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Outras lesões pele</Form.Label>
							<Form.Control as="textarea" rows="3" disabled value={item.anamnese.pele_lesoes.outros} />
						</Form.Group>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col>
						<p className="subtitle">Lesões Ortopedicas</p>
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.orto_lesoes.halux_valgus.length > 0 && (
							<label className="mr-2">
								{' '}
								Halux Valgus - {item.anamnese.orto_lesoes.halux_valgus.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.orto_lesoes.halux_rigidus.length > 0 && (
							<label className="mr-2">
								{' '}
								Halux Rigidus -{' '}
								{item.anamnese.orto_lesoes.halux_rigidus.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.orto_lesoes.esporao_calcaneo.length > 0 && (
							<label className="mr-2">
								{' '}
								Esporão Calcaneo -{' '}
								{item.anamnese.orto_lesoes.esporao_calcaneo.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.orto_lesoes.dedos_garra.length > 0 && (
							<label className="mr-2">
								{' '}
								Dedos em Garra -{' '}
								{item.anamnese.orto_lesoes.dedos_garra.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.orto_lesoes.tipo_pe.length > 0 && (
							<label className="mr-2">
								{' '}
								Tipos de pé - {item.anamnese.orto_lesoes.tipo_pe.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.orto_lesoes.tipos_de_pisada.length > 0 && (
							<label className="mr-2">
								{' '}
								Tipos de pisada -{' '}
								{item.anamnese.orto_lesoes.tipos_de_pisada.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.orto_lesoes.tipos_joelho.length > 0 && (
							<label className="mr-2">
								{' '}
								Tipos de joelhos -{' '}
								{item.anamnese.orto_lesoes.tipos_joelho.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{item.anamnese.orto_lesoes.tipos_dedos.length > 0 && (
							<label className="mr-2">
								{' '}
								Tipo de dedos - {item.anamnese.orto_lesoes.tipos_dedos.map((item) => item.label).join()}
							</label>
						)}
					</Col>
				</Row>

				<Row className="mt-2">
					<Col>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Outras lesões ortopedicas</Form.Label>
							<Form.Control as="textarea" rows="3" disabled value={item.anamnese.orto_lesoes.outros} />
						</Form.Group>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col>
						<p className="subtitle">Exames fisicos</p>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<p>Monofilamento - {item.anamnese.exame_fisico.monofilamento}</p>
					</Col>
					<Col md={3}>
						<p>Diapasão - {item.anamnese.exame_fisico.diapasao}</p>
					</Col>
					<Col md={3}>
						<p>Digitopressão - {item.anamnese.exame_fisico.digitopressao}</p>
					</Col>
					<Col md={3}>
						<p>Pulsos - {item.anamnese.exame_fisico.pulsos}</p>
					</Col>
				</Row>
			</div>
			<div className="page">
				<Row className="justify-content-center mb-4">
					<Col md={4} className="text-center">
						<Image className="mt-2" src={Logo2} />
					</Col>
				</Row>

				<Row className="mt-4">
					<Col>
						<p className="subtitle">Fotos</p>
					</Col>
				</Row>
				<Row>
					{photos.length == 0 ? (
						<Col>
							<p className="text-muted text-center">Sem fotos</p>
						</Col>
					) : (
						photos.map((photo) => (
							<Col md={6} className="mt-2" key={photo._id}>
								<Image src={photo.url} style={{ width: '300px', height: '150px' }} />
							</Col>
						))
					)}
				</Row>
				<Row className="justify-content-center mb-4">
					<Col md={6} className="form-inline mt-4">
						<Form.Check
							label="Autorizo a publicação das imagens nas redes sociais da clinica"
							type="checkbox"
							readOnly
						/>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col md={6}>
						<hr />
					</Col>
				</Row>
			</div>
		</>
	);
};

export default FichaConsult;
