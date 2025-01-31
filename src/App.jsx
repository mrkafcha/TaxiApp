import './App.css'
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Header from "./components/Header/Header.jsx";
import Trips from "./pages/Trips.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {

  return (
      <div className="h-100 d-flex flex-column justify-content-between">
          <div style={{ minHeight: "100vh" }}>
              <Header />
              <div>
                  <Routes>
                      <Route path='/login' element={<Login />}/>
                      <Route path="/" element={<PrivateRoute ><Trips /></PrivateRoute>}/>
                  </Routes>
              </div>
          </div>
      </div>

  )
}

export default App
