import style from './TripPassenger.module.css';
import {status} from "../../../../helpers/status.js";
import {useDeleteTripMutation} from "../../../../store/tripApi.js";
import {Button} from "react-bootstrap";

const Status = ({trip}) => {
    switch(trip.status) {
        case status.search:
            return <div className={style.status_item} data-status={status.search}>{status.search}</div>
        case status.accept:
            return <div className={style.status_item} data-status={status.accept}>{status.accept}</div>
        case status.await:
            return <div className={style.status_item} data-status={status.await}>{status.await}</div>
        case status.completed:
            return <div className={style.status_item} data-status={status.completed}>{status.completed}</div>
        default:
            return null;
    }
};

const TripPassenger = ({trip}) => {
    const [deleteTrips] = useDeleteTripMutation();

    const handleDeleteTrip = async (trip) => {
        await deleteTrips(trip);
    }

    return (
        <div>

            <div key={trip.id} className={`container text-center shadow-lg ${style.trip}`}>

                <div className='row'>
                    <div className='col'>
                        <span className={style.th}>Регион:</span>
                        <br/>
                        {trip.region}
                    </div>
                    <div className='col'>
                        <span className={style.th}>Откуда:</span>
                        <br></br>
                        {trip.from}
                    </div>
                    <div className='col'>
                        <span className={style.th}>Куда:</span>
                        <br/>
                        {trip.to}
                    </div>
                    <div className='col'>
                        <span className={style.th}>Тариф:</span>
                        <br/>
                        {trip.tarif}
                    </div>
                    <div className={style.containerButtonCancel}>
                        <Button  id={style.buttonCancel} onClick={() => handleDeleteTrip(trip)}>Отменить</Button>
                    </div>
                    <div className={style.status}>
                        <Status trip={trip}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripPassenger