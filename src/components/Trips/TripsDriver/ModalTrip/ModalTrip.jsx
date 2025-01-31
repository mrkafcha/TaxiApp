import { useUpdateTripMutation} from "../../../../store/tripApi.js";
import {Button, Modal} from "react-bootstrap";
import style from "../../TripsPassenger/ModalAddTrips/ModalAddTrips.module.css";
import {status} from "../../../../helpers/status.js";

const styleModalItem = {
    backgroundColor: "#f3f2f0",
    borderRadius: '30px',
    padding: '5px 10px',
    margin: '10px'
};


const buttonStatus = (trip) => {
    switch(trip.status) {
        case status.search:
            return 'Начать поездку'
        case status.accept:
            return "Приехал на место"
        case status.await:
            return "Завершить поездку"
        default:
            return null;
    }
};

const UpdateTripModal = ({show, onHide, trip}) => {
    const [updateTrip] = useUpdateTripMutation();

    const handleUpdateStatus = async (trip) => {
        const data = {...trip};

        switch(trip.status) {
            case status.search:
                data.status = status.accept
                await updateTrip(data);
                return null
            case status.accept:
                data.status = status.await
                await updateTrip(data);
                return null
            case status.await:
                data.status = status.completed
                await updateTrip(data);
                return null
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            style={{color: "#223f61"}}
        >
            <Modal.Header closeButton>
                <Modal.Title  >
                    Поездка
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={styleModalItem}>
                    <span style={{ fontWeight: 'bold'}}>Регион:</span> <span>{trip.region}</span>
                </div>
                <div style={styleModalItem}>
                    <span style={{ fontWeight: 'bold'}}>Откуда:</span> <span>{trip.from}</span>
                </div>
                <div style={styleModalItem}>
                    <span style={{ fontWeight: 'bold'}}>Куда:</span> <span>{trip.to}</span>
                </div>
                <div style={styleModalItem}>
                    <span style={{ fontWeight: 'bold'}} >Тариф:</span> <span>{trip.tarif}</span>
                </div>
                <div className={style.buttons}>
                    <Button id={style.button} onClick={() => handleUpdateStatus(trip)}>{buttonStatus(trip)}</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default UpdateTripModal;