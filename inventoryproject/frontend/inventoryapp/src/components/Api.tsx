import { useEffect, useState } from 'preact/hooks';
import './styles/Api.css';

export interface Item {
    id: number;
    itemName: string;
    qty: number;
}

export const ApiGet = (refresh: boolean): Item[] => {

    const[data, setData] = useState<Item[]>([]);
    
    const fetchData = async() =>{
        try {
            const response = await fetch('http://localhost:8080/api/item', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error("Fetch Failed");
            }
    
            const result: Item[] = await response.json();
            setData(result);
            
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchData();
    },[refresh]);

    return data;
}

export const ApiDelete = async(id: number) => {
    try{
        const response = await fetch(`http://localhost:8080/api/item?id=${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok){
            throw new Error("Fetch Failed");
        }
    }catch(err){
        console.log(err);
    }
}

export const ApiPut = async(id: number, itemName: string) => {
    try{
        const response = await fetch(`http://localhost:8080/api/item/${encodeURIComponent(id)}?itemName=${encodeURIComponent(itemName)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok){
            throw new Error("Fetch Failed");
        }
    }catch(err){
        console.log(err);
    }
}

export const ApiPutQty = async(id: number, itemName: string, qty: number) => {
    try{
        const response = await fetch(`http://localhost:8080/api/item/qty/${encodeURIComponent(id)}?itemName=${encodeURIComponent(itemName)}&qty=${encodeURIComponent(qty)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok){
            throw new Error("Fetch Failed");
        }
    }catch(err){
        console.log(err);
    }
}

export const ApiPost = async(itemName: string) => {
    try {
        const response = await fetch(`http://localhost:8080/api/item?itemName=${encodeURIComponent(itemName)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Fetch Failed");
        }

    } catch (err) {
        console.log(err);
    }
};

export const ApiItemCounts = async (): Promise<number> => {
    try {
        const response = await fetch('http://localhost:8080/api/item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Fetch Failed');
        }

        const data: Item[] = await response.json();
        return data.length;
    } catch (error) {
        console.error('Error fetching item counts:', error);
        return 0;
    }
};


