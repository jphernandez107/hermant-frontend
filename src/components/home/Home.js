import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Sidebar from '../sidebar/Sidebar';


class Home extends React.Component {

    render() {
        return(
            <Router>
                <div className='home'> 
                    <Sidebar className='sidebar'/>
                    <div className='body'> BODY </div>
                </div>
                
 
            </Router>
 
        )
 
    }
 
}
 
export default Home;