import {regions} from "../../../helpers/regions.js";
import {Button, Form} from "react-bootstrap";
import style from './TripsDriver.module.css';
import {useDispatch, useSelector} from "react-redux";
import TripDriver from "./Trip/TripDriver.jsx";
import {setRegion} from "../../../store/authSlice.js";
import {useEffect, useState} from "react";

const statusOrder = {
    "Поиск": 1,
    "Принят": 2,
    "Ожидает": 3,
};

const filterRegionTrips = (trips, region) => {
    return trips
        .filter(trip => statusOrder[trip.status])
        .reverse()
        .filter(trip => trip.region === region)
        .filter(trip => trip.status !== 'Завершен')
        .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
};

const filterTarifTrips = (trips, tarif) => {
    if (tarif === "Все") {
        return trips;
    }
    return trips.filter(trip => trip.tarif === tarif);
}

const TripsDriver = ({trips}) => {
    const { region } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // const [viewCountTrips, setViewCountTrips] = useState(5);
    const [viewTarif, setViewTariff] = useState('Все')
    const [filterTrips, setFilterTrips] = useState([]);


    const handleInRegion = (region) => {
        localStorage.setItem('region', region);
        dispatch(setRegion(region));
    };
    const handleOutRegion = (region) => {
        setViewTariff("Все");
        localStorage.removeItem('region', region);
        dispatch(setRegion(region));
    }

    useEffect(() => {
        setFilterTrips(filterRegionTrips(trips, region));
    }, []);

    useEffect(() => {
        setFilterTrips(filterTarifTrips(filterRegionTrips(trips, region), viewTarif));
    }, [viewTarif, region]);


    return (
        <div className={style.trips}>
            {region ?
                <div>
                    <div className={style.headerContainer}>
                        <Button id={style.button} onClick={() => handleOutRegion(undefined)}>Назад</Button>
                        <div className={style.containerSelect}>
                            <Form.Select className={style.select} onChange={(e) => setViewTariff(e.target.value)}>
                                <option>Все</option>
                                <option>Эконом</option>
                                <option>Комфорт</option>
                                <option>Бизнес</option>
                            </Form.Select>
                            <Form.Select className={style.select}>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                            </Form.Select>
                        </div>

                    </div>

                    {filterTrips.map((trip) => <TripDriver key={trip.id} trip={trip} />)}
                </div>

                :
                regions.map((reg, index) =>
                    <div>
                        <Button key={index} id={style.buttonRegion} onClick={() => handleInRegion(reg)}>{reg}</Button>
                    </div>)
            }
        </div>
    )
}

export default TripsDriver;