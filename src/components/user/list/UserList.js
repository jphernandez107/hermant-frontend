import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./UserList.scss";

import Button from "components/button/Button"
import List from "components/list/List";

const api = require("api/Api").default;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loadingState, setLoadingState] = useState("Buscando usuarios...")

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate()

  const columns = [
    { dni: "DNI", isSortable: true },
    { first_name: "Nombre", isFilterable: true, isSortable: true },
    { last_name: "Apellido", isFilterable: true, isSortable: true },
    { role: "Permisos", isFilterable: true, isSortable: true },
    { active: "Activo", isFilterable: true, isSortable: true },
    { last_login: "Último Inicio", isFilterable: true, isSortable: true },
  ];

  function onRowClicked(id) {
    // Nothing to do here
  }

  return (
    <List 
      table_columns={columns} 
      table_data={users} 
      title={'Usuarios'} 
      onRowClicked={onRowClicked}
      loadingState={loadingState}  
    >
      <Button isLink={true} href={`new`}>
        <i className="fas fa-plus" aria-hidden="true" /> Nuevo Usuario
      </Button>
    </List>
  );

  async function fetchUsers() {
    try {
      const response = await api.getUserList();
      response.forEach(user => {
        user.active = user.active ? "Si" : "No";
        user.code = user.id
        if (user.last_login) user.last_login = new Date(user.last_login).toLocaleString()
        return user;
      })
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
    setLoadingState(null);
  }
};

export default UserList;