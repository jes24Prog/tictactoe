import { useState } from 'preact/hooks';
import './styles/Header.css';
import Sidebar from './Sidebar';
import Icon from 'preact-material-components/Icon';

const Header = () => {

    const [isSidebar, setSidebar] = useState<boolean>(true);

    const handleSidebar = () =>{
        setSidebar(prevstate => !prevstate);
    }

    return(
    <>
        <div className="header">
            <div className="button-container">
                <button onClick={()=>handleSidebar()}>{isSidebar ? <Icon>close</Icon> : <Icon>menu</Icon>}</button>
            </div>
        </div>
        <Sidebar isShow={isSidebar}/>
    </>
    )
}

export default Header;