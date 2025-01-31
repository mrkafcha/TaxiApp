import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../store/authSlice.js";
import {useNavigate} from "react-router-dom";
import style from "./Login.module.css";

const Login = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logInPassenger = () => {
        localStorage.setItem('user', "passenger");
        dispatch(setUser("passenger"));
        navigate('/');
    }
    const logInDriver = () => {
        localStorage.setItem('user', "driver");
        dispatch(setUser("driver"));
        navigate('/');
    }

    return (
        <div className={style.users}>
            <Button id={style.button} onClick={logInPassenger}>Пассажир</Button>
            <Button id={style.button} onClick={logInDriver}>Водитель</Button>
        </div>
    )
};

export default Login