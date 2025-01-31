import style from './Header.module.css'
import {Container, Navbar, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setRegion, setUser} from "../../store/authSlice.js";

const User = ({user}) => {
    switch (user) {
        case 'passenger':
            return <div className={style.user}>Пассажир</div>;
        case 'driver':
            return <div className={style.user}>Водитель</div>;
        default:
            return null;
    }
};

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);


    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('region');
        dispatch(setUser(undefined));
        dispatch(setRegion(undefined));
    }

    return (
        <Navbar className={style.header} expand="lg"  >
            <Container >
                <Navbar.Brand className={` col text-start ${style.logo}`} style={{color: "#223f61"}}>Такси</Navbar.Brand>

                {user ? (<User user={user}/>) : null }
                {user ?
                    (<div className="justify-content-end ">
                            <Button
                                id={style.button}
                                onClick={logOut}
                            >
                                Выйти
                            </Button>
                    </div>
                    )
                    : null}

            </Container>
        </Navbar>
)
};

export default Header;