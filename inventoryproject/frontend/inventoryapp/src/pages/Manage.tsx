
import { useState } from 'preact/hooks';
import './styles/Manage.css';
import { ShowDialog } from '../components/Dialog';
import { ApiPost, ApiGet, ApiDelete, ApiPut, ApiPutQty } from '../components/Api';
import Icon from 'preact-material-components/Icon';

const Manage = () => {
    const[refresh, setRefresh] = useState<boolean>(false);

    const handleRefresh = () =>{
        setRefresh(prev => !prev);
    }

    const data = ApiGet(refresh);

    

    const[isOpen, setOpen] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string>('');
    const[itemSearch, setItemSearch] = useState<string>('')

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const[isOpenUpdate, setOpenUpdate] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);

    const handleInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setItemName(target.value);
    };

    const handleInputSearch = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setItemSearch(target.value);
    };

    const addItem = async(itemName: string) => {
        await ApiPost(itemName);
        handleRefresh();
    }

    const filteredItems = data.filter(item =>
        item.itemName.toLowerCase().includes(itemSearch.toLowerCase())
    );

    const displayItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const updateItem = async(itemName: string) => {
        await ApiPut(id, itemName);
        handleRefresh();
    }

    const UpdateDialogcontent = (): JSX.Element => (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <input type="text" placeholder="Enter Item Name" value={itemName} onChange={handleInputChange}/>
            <button onClick={() => {
                updateItem(itemName);
                setOpenUpdate(false);
                }} className="button-style">Update</button>
        </div>
    );

    const AddDialogontent = (): JSX.Element => (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <input type="text" placeholder="Enter Item Name" value={itemName} onChange={handleInputChange}/>
            <button onClick={() => {
                addItem(itemName);
                setOpen(false);
                setItemName("");
                }} className="button-style">Add</button>
        </div>
    );

    return (
        <div className="manage">
            <div className="manage-content">
                <div className="manage-button">
                    <input type="text" placeholder="Search Item Name" value={itemSearch} onChange={handleInputSearch}/>
                    <button className="button-style" onClick={()=>setOpen(true)}>Add</button>
                </div>
            </div>
            <div className="item-content-container">
                <div className="table-content">
                    { data.length > 0 ? (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{width: '20%'}}>No</th>
                                        <th style={{width: '40%'}}>ID</th>
                                        <th>Item Name</th>
                                        <th>Qty</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayItems.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.itemName.charAt(0).toUpperCase() + item.itemName.slice(1, item.itemName.length).toLowerCase()}</td>
                                            <td><button onClick={async ()=>{
                                                if(item.qty !== 0){
                                                    const qty = await item.qty - 1;
                                                    await ApiPutQty(item.id, item.itemName, qty);
                                                    handleRefresh();
                                                }
                                            }} className="buttonQty">-</button> {item.qty} <button className="buttonQty" onClick={async()=>{
                                                const qty = await item.qty + 1;
                                                await ApiPutQty(item.id, item.itemName, qty);
                                                handleRefresh();
                                            }}>+</button></td>
                                            <td><button onClick={()=>{
                                                setId(item.id);
                                                setItemName(item.itemName);
                                                setOpenUpdate(true);
                                            }} className="button"><Icon>upgrade</Icon></button></td>
                                            <td><button onClick={async()=>{
                                                await ApiDelete(item.id);
                                                handleRefresh();
                                                }} className="button"><Icon>delete</Icon></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p>No items found.</p>
                        </div>
                    )}
                </div>
                {data.length > 0 ?<div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        {"<"}
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        {">"}
                    </button>
                </div> : ''}
            </div>
            <ShowDialog content={UpdateDialogcontent} open={isOpenUpdate} close={()=>setOpenUpdate(false)}/>
            <ShowDialog content={AddDialogontent} open={isOpen} close={()=> setOpen(false)}/>
        </div>
        
    );
};

export default Manage;
