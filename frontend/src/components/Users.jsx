import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users!</p>;

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
