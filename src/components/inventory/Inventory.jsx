import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../../styles/components/Inventory.css';
import InventoryItem from './inventoryItem/InventoryItem';

const Inventory = () => {    
    const filter = useSelector(state => state.searchFilter.term);
    
    const [vehicles, setVehicles] = useState([]);

    function fetchVehicles() {
        axios
            .get('http://localhost:9000/vehicles/')
            .then((resp) => {
                setVehicles(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <div className='inventory-wrapper'>
            <div className='inventory-header-container'>
                <div className='inventory-title'>Inventory</div>
                {/* <div className='inventory-actions'></div> */}
            </div>
            <div className='inventory-container'>
                {filter.length > 0
                    ? vehicles
                          .filter((item) => {
                              const name = `${item.make} ${item.model} ${item.style}`;
                              return name.toLowerCase().includes(filter);
                          })
                          .map((item, key) => {
                              return <Link to={`/vehicle/${item._id}`} key={item._id}><InventoryItem item={item} /></Link>;
                          })
                    : vehicles.map((item, key) => {
                          return <Link to={`/vehicle/${item._id}`} key={item._id}><InventoryItem item={item} /></Link>;
                      })}
            </div>
        </div>
    );
};

export default Inventory;
