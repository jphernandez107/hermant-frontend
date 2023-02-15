import React, { useState } from 'react';
import "./Body.css"

import EquipmentList from '../equipment/EquipmentList';

const Body = () => {

    const columns = [
        "CÓDIGE", "DESIGNACIÓN", "MARCA", "MODELO" ,
        "HORÓMETRO", "PRÓXIMO MANTENIMIENTO", "DETALLES"
    ]
    const data = [
        {
          "CÓDIGO": "001",
          "DESIGNACIÓN": "Generador",
          "MARCA": "Honda",
          "MODELO": "EU7000iS",
          "HORÓMETRO": 150,
          "PRÓXIMO MANTENIMIENTO": "2023-03-15",
          "DETALLES": "Incluye kit de ruedas y manija de transporte"
        },
        {
          "CÓDIGO": "002",
          "DESIGNACIÓN": "Compresor de aire",
          "MARCA": "DeWalt",
          "MODELO": "D55168",
          "HORÓMETRO": 220,
          "PRÓXIMO MANTENIMIENTO": "2023-04-01",
          "DETALLES": "Presión máxima de 225 PSI"
        },
        {
          "CÓDIGO": "003",
          "DESIGNACIÓN": "Cortadora de césped",
          "MARCA": "Toro",
          "MODELO": "20339",
          "HORÓMETRO": 75,
          "PRÓXIMO MANTENIMIENTO": "2023-05-01",
          "DETALLES": "Ancho de corte de 22 pulgadas"
        },
        {
          "CÓDIGO": "004",
          "DESIGNACIÓN": "Soldadora",
          "MARCA": "Lincoln Electric",
          "MODELO": "K2185-1",
          "HORÓMETRO": 50,
          "PRÓXIMO MANTENIMIENTO": "2023-03-30",
          "DETALLES": "Capacidad de soldar acero, hierro y acero inoxidable"
        },
        {
          "CÓDIGO": "005",
          "DESIGNACIÓN": "Taladro inalámbrico",
          "MARCA": "Makita",
          "MODELO": "XFD131",
          "HORÓMETRO": 0,
          "PRÓXIMO MANTENIMIENTO": "2023-08-01",
          "DETALLES": "Incluye batería de iones de litio de 18V"
        }
      ]

    return (
        <div className='page-wrapper'>
            <div className='body'>
                <EquipmentList></EquipmentList>
            </div>
            <footer className="footer">
                <p>All Rights Reserved by HERMANT®. Designed and developed by HERMANT® Company</p>
            </footer>
        </div>
        
    )

}

export default Body;