import React from 'react';
import "./Home.scss"


import Sidebar from "components/sidebar/Sidebar";
import Body from "components/body/Body";


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