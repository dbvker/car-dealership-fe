import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/features/searchSlice';

import '../../styles/components/Search.css';

import { bodyStyles } from '../../data/carData';

const Search = () => {
    const filter = useSelector((state) => state.searchFilter.term);
    const dispatch = useDispatch();

    const [selectedBody, setSelectedBody] = useState([]);

    const toggleSelected = (style) => {
        if (!selectedBody.includes(style)) {
            setSelectedBody([...selectedBody, style]);
        } else {
          setSelectedBody((array) => array.filter(item => item !== style));
        }
    };

    return (
        <div className='search-wrapper'>
            <h1>Find your dream car today</h1>
            <div className='search'>
                <input type='text' placeholder='Search by make or model...' value={filter} onChange={(e) => dispatch(setFilter(e.target.value))} />
            </div>
            <div className='body-styles-search'>
                Search by Body Style
                <div className='body-styles-content'>
                    {bodyStyles.map((item, id) => {
                        return (
                            <div className={selectedBody.includes(item) ? 'body-style-active' : 'body-style-item'} key={id} onClick={() => toggleSelected(item)}>
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Search;
