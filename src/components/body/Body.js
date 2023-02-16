import React, { useState } from 'react';
import "./Body.css"

import EquipmentList from '../equipment/EquipmentList';
import ConstructionSiteList from '../site/ConstructionSiteList';
import {  Route, Routes } from 'react-router-dom';

const Body = () => {

    return (
            <div className='page-wrapper'>
                <header>
                    
                </header>
                <div className='body'>
                    <Routes>
                        <Route path='/' element={<EquipmentList/>}/>
                        <Route path='/equipment/list' element={<EquipmentList/>}/>
                        <Route path='/site/list' element={<ConstructionSiteList/>}/>
                    </Routes>
                </div>
                <footer className="footer">
                    <p>All Rights Reserved by HERMANT®. Designed and developed by HERMANT® Company</p>
                </footer>
            </div>
        
    )

}

export default Body;