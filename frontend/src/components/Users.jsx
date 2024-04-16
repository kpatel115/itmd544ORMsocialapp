import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query allUsers {
    allUsers {
      user_id
      name
      email
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users!</p>;

  // Ensure data is accessed correctly
  if (!data || !data.allUsers) return <p>No data found!</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.allUsers.map(({ user_id, name, email }) => (
          <li key={user_id}>
            {name} - {email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
