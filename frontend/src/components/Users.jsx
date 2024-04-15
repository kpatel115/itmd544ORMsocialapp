// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { fetchUsers } from '../api/api';
const getUsers = gql`
  query getUsers {
    getUsers {
      user_id
      name
      email
    }
  }
`;
const Users = () => {
    // const [users, setUsers] = useState([]);
    const { loading, error, data } = useQuery(getUsers);

    if (loading) return <p>Loading...</p>;


    // useEffect(() => {
    //     fetchUsers()
    //         .then(response => setUsers(response.data))
    //         .catch(error => console.error('Error fetching users:', error));
    // }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
            {data.getUsers.map(({ id, name, email }) => (
                <li key={id}>
                    {name} - {email}
                </li>
        ))}
      </ul>
        </div>
    );
  };

export default Users;
