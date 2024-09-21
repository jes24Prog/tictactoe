
import {Route, Router} from "preact-router"
import Home from "../pages/Home"
import Manage from "../pages/Manage";
import Items from "../pages/Items";


const Routes = () =>{
    return(
        <div>
            <Router>
                <Route path="/" component={Home}/>
                <Route path="/items" component={Items}/>
                <Route path="/manage" component={Manage}/>
            </Router>
        </div>
    )
}

export default Routes;