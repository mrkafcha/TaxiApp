import { useGetTripsQuery} from "../store/tripApi.js";
import {useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import TripsDriver from "../components/Trips/TripsDriver/TripsDriver.jsx";
import TripsPassenger from "../components/Trips/TripsPassenger/TripsPassenger.jsx";

const Trips = () => {

    const { user } = useSelector((state) => state.auth);
    const { data: trips = [], error: tripsError, status,  } = useGetTripsQuery();

    return (
        <>
            {status === 'fulfilled' ?
                user === 'driver' ? <TripsDriver trips={trips}/> : <TripsPassenger trips={trips}/>
                :
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
        </>
    )
};
export default Trips;