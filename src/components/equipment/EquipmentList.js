import React, { useEffect, useState } from 'react';
import "./EquipmentList.css"

import Table from '../table/Table'

const api = require('../../api/Api')

const EquipmentList = () => {

    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        fetchEquipments();
    }, []);

    const columns = [
        {"code":"CÓDIGO"}, {"designation":"DESIGNACIÓN"}, {"brand":"MARCA"}, {"model":"MODELO"},
        {"total_hours":"HORÓMETRO"}, {"next_maintenance":"PRÓXIMO MANTENIMIENTO"}, {"observations":"DETALLES"}
    ]

    return (
        <Table columns={columns} data={equipments} title={'Equipos'}></Table>
    )

    async function fetchEquipments() {
        try {
            const response = await api.getEquipmentList();
            setEquipments(response);
        } catch (error) {
            console.log(error)
        }
    }

}

export default EquipmentList;