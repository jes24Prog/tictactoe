
import {Route, Router} from "preact-router"
import Home from "../pages/Home"
import Manage from "../pages/Manage";


const Routes = () =>{
    return(
        <div>
            <Router>
                <Route path="/" component={Home}/>
                <Route path="/manage" component={Manage}/>
            </Router>
        </div>
    )
}

export default Routes;