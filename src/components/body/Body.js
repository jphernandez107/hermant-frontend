import React, { useState } from 'react';
import "./Body.css"

import EquipmentList from '../equipment/EquipmentList';
import ConstructionSiteList from '../site/ConstructionSiteList';
import SparePartList from '../sparePart/SparePartList';
import {  Route, Routes } from 'react-router-dom';
import EquipmentDetails from '../equipment/details/EquipmentDetails';

const Body = () => {

    return (
            <div className='page-wrapper'>
                <header>
                    
                </header>
                <div className='body'>
                    <Routes>
                        <Route path='/' element={<EquipmentList/>}/>
                        <Route path='/equipment/list' element={<EquipmentList/>}/>
                        <Route path='/equipment/details/:code' element={<EquipmentDetails/>}/>
                        <Route path='/site/list' element={<ConstructionSiteList/>}/>
                        <Route path='/part/list' element={<SparePartList/>}/>
                    </Routes>
                </div>
                <footer className="footer">
                    <p>All Rights Reserved by HERMANT®. Designed and developed by HERMANT® Company</p>
                </footer>
            </div>
        
    )

}

export default Body;