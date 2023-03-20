import { useState, useEffect } from 'react';

import Header from '../components/header/Header';
import decodeJWT from "jwt-decode";
import axios from 'axios';
import { useParams } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/IosShare';

import '../styles/Vehicle.css';

const initialValues = {
    make: "",
    model: "",
    style: "",
    year: "",
    price: "",
    stock: "",
    vin: "",
}

const Vehicle = () => {
    let { id } = useParams();
    const [vehicle, setVehicle] = useState([])

    let userID = null;

    const token = localStorage.getItem('token');
  
    if (userID === null && token) {
      const decoded = decodeJWT(token);
      userID = decoded.id;
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/vehicles/${id}`)
        .then(resp => {
            setVehicle(resp.data);
        })
        .catch(err => console.error(err));

    }, [id])

    return (
        <div>
            <Header userID={userID} />
            <div className='page-options max-width'>
                Return
                <div className='page-action'>
                    <FavoriteIcon className='page-action-icon' />
                    <ShareIcon className='page-action-icon' />
                </div>
            </div>
            <div className='vehicle-info  max-width'>
                <div>
                    <p className='vehicle-title'>{vehicle.year} - {vehicle.make} {vehicle.model}</p>
                    <p className='vehicle-subtitle'>{vehicle.style}</p>
                </div>
                <div>
                    <p className='vehicle-price'>${vehicle.price}</p>
                </div>
                <img src={vehicle.img_url} alt='vehicle' />
            </div>
        </div>
    );
};

export default Vehicle;
