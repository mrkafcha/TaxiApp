import {Button, Form, ListGroup} from "react-bootstrap";
import style from './TripsPassenger.module.css';
import {useEffect, useState} from "react";
import NewTripModal from "./ModalAddTrips/ModalAddTrip.jsx";
import TripPassenger from "./Trip/TripPassenger.jsx";

const statusOrder = {
    "Поиск": 1,
    "Принят": 2,
    "Ожидает": 3,
    "Завершен": 4,
};
const filterAndSortTrips = (trips) => {
    return trips
        .filter(trip => statusOrder[trip.status])
        .reverse()
        .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
};

const filterStatusTrips = (trips, status) => {
    if (status === "Опубликованные") {
        return trips.filter(trip => trip.status !== "Завершен");
    }
    return trips.filter(trip => trip.status === "Завершен");
}

const TripsPassenger = ({trips}) => {

    const [modalShow, setModalShow] = useState(false);
    const [viewStatus, setViewStatus] = useState('Опубликованные')
    const [filterTrips, setFilterTrips] = useState([]);

    useEffect(() => {
        setFilterTrips(filterAndSortTrips(trips));
    }, []);

    useEffect(() => {
        setFilterTrips(filterStatusTrips(filterAndSortTrips(trips), viewStatus));
    }, [viewStatus]);


    return (
        <div className={style.trips}>
            <div className={style.containerSelect}>
                <Form.Select className={style.select} onChange={(e) => setViewStatus(e.target.value)}>
                    <option>Опубликованные</option>
                    <option>Завершенные</option>
                </Form.Select>
            </div>

            <ListGroup>
                {filterTrips.map((trip, index) => <TripPassenger key={index} trip={trip} />)}
            </ListGroup>
            <Button id={style.button} onClick={() => setModalShow(true)}>Добавить поездку</Button>
            <NewTripModal show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    )
};

export default TripsPassenger;