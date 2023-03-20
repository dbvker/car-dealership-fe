import { useState } from 'react';
import { useSelector } from 'react-redux';


import FavoriteOutline from '@mui/icons-material/FavoriteBorder';
import FavoriteFilled from '@mui/icons-material/Favorite';

const InventoryItem = ({ item }) => {
    const userID = useSelector(state => state.userAuth.userID);

    const [favoriteCar, setFavoriteCar] = useState(false);

    return (
        <div className='item-container'>
            {(userID) ? (favoriteCar ? 
                <FavoriteFilled className='favorite-icon hearted' onClick={() => setFavoriteCar(!favoriteCar)} /> : 
                <FavoriteOutline className='favorite-icon' onClick={() => setFavoriteCar(!favoriteCar)} />) : ''}

            <div className='item-image'>
                <img src={item.img_url} alt="vehicle" />
            </div>
            <p className='item-make'>
                {item.year} - {item.make} {item.model}
            </p>
            <p className='item-model'>{item.style}</p>
            <p className='item-mileage'>Mileage: {item.mileage.toLocaleString()}</p>
            <p className='item-price'>${item.price.toLocaleString()}</p>
        </div>
    );
};

export default InventoryItem;
