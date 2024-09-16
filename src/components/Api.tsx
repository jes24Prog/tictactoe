import { useEffect, useState } from 'preact/hooks'


interface Item {
    id: number;
    itemName: string;
}

const Api = () => {

const[data, setData] = useState<Item[]>([]);


useEffect(()=>{
    const fetchData = async() => {
        const response = await fetch('http://localhost:8080/api/item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(!response.ok){
            throw new Error("Fetch Failed");
        }

        const result: Item[] = await response.json();
        console.log('Fetched data:', result);
        setData(result);
    }

    fetchData();
},[data])

    return (
        <div>
            {data.length > 0 ? (
            <ul>
                {data.map(item=> (
                <li key={item.id}>{item.itemName}</li>
                ))}
            </ul>
            ) : (
            <p>No items found.</p>
            )}
        </div>
    )
}

export default Api;