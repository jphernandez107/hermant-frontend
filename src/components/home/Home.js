import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Home.css"


import Sidebar from '../sidebar/Sidebar';
import Body from '../body/Body';


class Home extends React.Component {

    render() {
        return(
            <Router>
                <div className='home'> 
                    <Sidebar className='sidebar'/>
                    <Body className='body'/>
                </div>
                
 
            </Router>
 
        )
 
    }
 
}
 
export default Home;