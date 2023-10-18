import React from "react";
import { useQuery } from "react-query";
import "./UserList.scss";

import Button from "components/button/Button"
import List from "components/list/List";

const api = require("api/Api").default;

const UserList = () => {

  const {
		data: users = [],
		isLoading,
		isError,
		error,
		isSuccess,
	} = useQuery("users", fetchUsers);

  const loadingState = isLoading ? "Buscando usuarios..." : undefined

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
      const response = await api.getUserList();
      return response.map(user => {
        user.active = user.active ? "Si" : "No";
        user.code = user.id
        if (user.last_login) user.last_login = new Date(user.last_login).toLocaleString()
        return user;
      });
  }
};

export default UserList;