import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./UserList.scss";

import Button from "components/button/Button"
import List from "components/list/List";

const api = require("api/Api").default;

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate()

  const columns = [
    { dni: "DNI" },
    { first_name: "Nombre" },
    { last_name: "Apellido" },
    { role: "Permisos" },
    { active: "Activo" },
    { last_login: "Último Inicio" },
  ];

  function onRowClicked(id) {
    navigate('/user/details/' + id)
  }

  return (
    <List table_columns={columns} table_data={users} title={'Usuarios'} onRowClicked={onRowClicked}>
      <Button isLink={true} href={`new`}>
        <i className="fas fa-plus" aria-hidden="true" /> Nuevo Usuario
      </Button>
    </List>
  );

  async function fetchUsers() {
    try {
      const response = await api.getUserList();
      console.log(response)
      response.forEach(user => {
        user.active = user.active ? "Si" : "No";
        user.code = user.id
        return user;
      })
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  }
};

export default UserList;