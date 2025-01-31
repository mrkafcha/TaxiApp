import {Button, Modal, Form} from "react-bootstrap";
import style from './ModalAddTrips.module.css';
import {useState} from "react";
import {AddressSuggestions} from "react-dadata";
import 'react-dadata/dist/react-dadata.css';
import {useAddTripsMutation} from "../../../../store/tripApi.js";
import {regions} from "../../../../helpers/regions.js";
import {status} from "../../../../helpers/status.js";
const maxLength = 200;
const minLength = 1;

const NewTripModal = ({show, onHide}) => {
    const token = "7140ff49ba597caf311df82cdfea3cc5f47f1209";
    const [region, setRegion] = useState(regions[0]);
    const [valueTo, setValueTo] = useState('');
    const [valueFrom, setValueFrom] = useState('');
    const [tarif, setTarif] = useState('Эконом');
    const [addTrips, {error: addTripsError}] = useAddTripsMutation();

    const handleAddTrip = async (e) => {
        e.preventDefault();
        if (valueFrom.length > maxLength || valueTo.length > maxLength || valueFrom.length < minLength || valueTo.length < minLength) {
            return null;
        }

        const data = {};
        data.region = region;
        data.tarif = tarif;
        data.to = valueTo;
        data.from = valueFrom;
        data.status = status.search;
        await addTrips(data);
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{color: "#223f61"}}
            className={style.modal}
        >
            <Modal.Header  closeButton>
                <Modal.Title id="contained-modal-title-vcenter ">
                    Добавить поездку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddTrip} >
                    <Form.Group>
                        <Form.Label>Выберите регион</Form.Label>
                        <Form.Select value={region} onChange={(e) => setRegion(e.target.value)}>
                            {regions.map((reg, index) => <option key={index}>{reg}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Откуда</Form.Label>
                        <AddressSuggestions token={token} maxLength={2} filterLocations={[{city: region}]} count={5} onChange={(e) => setValueTo(e.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Куда</Form.Label>
                        <AddressSuggestions token={token} filterLocations={[{city: region}]} count={5} onChange={(e) => setValueFrom(e.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Выберите тариф</Form.Label>
                        <Form.Select value={tarif} onChange={(e) => setTarif(e.target.value)}>
                            <option>Эконом</option>
                            <option>Комфорт</option>
                            <option>Бизнес</option>
                        </Form.Select>
                    </Form.Group>
                    <div className={style.buttons}>
                        <Button type={"submit"} id={style.button} >Добавить поездку</Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    )
};
export default NewTripModal