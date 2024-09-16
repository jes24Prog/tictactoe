import { Link, useRouter } from 'preact-router';
import './styles/Sidebar.css';
import { useEffect, useState } from 'preact/hooks';

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width;
};

const SidebarContent = ({ currentPath }: { currentPath: string }) => (
    <div className="sidebar-content">
        <div>
            <h1>SIDEBAR</h1>
        </div>
        <div className="sidebar-link">
            <Link className={currentPath === '/' ? 'link active' : 'link'} href="/">Home</Link>
            <Link className={currentPath === '/manage' ? 'link active' : 'link'} href="/manage">Manage</Link>
        </div>
    </div>
);


const Sidebar  = ({isShow}: {isShow: boolean}) =>{
    const width = useWindowWidth();

    const [pathname]  = useRouter();
    const currentPath = pathname?.url || '/';
    

    return(
        <>
            {isShow && width <= 600 ? 
            <div className="sidebarOpen">
                <SidebarContent currentPath={currentPath} />
            </div> : 
            <div className="sidebar">
                <SidebarContent currentPath={currentPath} />
            </div>
            }
        </>
    )
}

export default Sidebar;