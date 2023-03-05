import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Home.scss"


import Sidebar from '../sidebar/Sidebar';
import Body from '../body/Body';


class Home extends React.Component {

    render() {
        return(
            <div className='home'> 
                <Sidebar className='sidebar'/>
                <Body className='body'/>
            </div>
        )
 
    }
 
}
 
export default Home;