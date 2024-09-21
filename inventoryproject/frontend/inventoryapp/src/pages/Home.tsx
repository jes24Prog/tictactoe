
import { useEffect, useState } from 'react';
import './styles/Home.css';
import { ApiItemCounts } from '../components/Api';

const Home = () =>{
    const[itemCounts, setItemCounts] = useState<number>(0);

    useEffect(() => {
        const getItemCounts = async () => {
            try {
                const counts = await ApiItemCounts();
                setItemCounts(counts);
            } catch (error) {
                console.error('Failed to fetch item counts:', error);
            }
        };

        getItemCounts();
    }, []);
    
    return(
        <div className="home">
            <div className="home-content">
                <div className="items-count">
                    <span>Items</span>
                    <span>{itemCounts}</span>
                </div>
            </div>
        </div>
    )
}

export default Home;