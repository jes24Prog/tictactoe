
import Icon from 'preact-material-components/Icon';
import { ApiGet } from '../components/Api';
import './styles/Items.css'
import { useState } from 'react';


const Items = () => {

    const data = ApiGet(true);

    const[itemSearch, setItemSearch] = useState<string>('')

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleInputSearch = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setItemSearch(target.value);
    };

    const filteredItems = data.filter(item =>
        item.itemName.toLowerCase().includes(itemSearch.toLowerCase())
    );

    const displayItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return(
        <div className="item">
            <div className="item-search">
                <input type="text" placeholder="Search Item Name" value={itemSearch} onChange={handleInputSearch}/>
            </div>
            <div className="item-content">
                    {data.length > 0 ? displayItems.map((item) => (
                        <div className="item-content-box">
                            <p key={item.id}><Icon>image</Icon></p>
                            <p key={item.id}>Item Name: {item.itemName}</p>
                            <p key={item.id}>Item ID: {item.id}</p>
                            <p key={item.id}>Qty: {item.qty}</p>
                            <p><button className="button-release" disabled={item.qty === 0}>Release</button></p>
                        </div>
                    )): 'No Items Found'}
            </div>
            <div className="item-pagination">
                {data.length > 0 ?<div className="pagination-box">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        {"<"}
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        {">"}
                    </button>
                </div> : ''}
            </div>
        </div>
    )
}

export default Items;