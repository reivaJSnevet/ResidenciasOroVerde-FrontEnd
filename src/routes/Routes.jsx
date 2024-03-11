import {Route} from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from "../pages/home/Home";


const routes = (
    <> 
        <Route path="/" element={<Layout />}>

          <Route path="/home" element={<Home/>}/>

        </Route>
    </>
)

export default routes;