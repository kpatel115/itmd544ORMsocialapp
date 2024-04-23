import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import SignupForm from './SignUpUser';
import UpdateUser from './updateUser';
import DeleteUser from './deleteUser';
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
  const [displayUsers, setDisplayUsers] = useState(false);

  const handleButtonClick = () => {
    setDisplayUsers(true)
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users!</p>;

  // Ensure data is accessed correctly
  if (!data || !data.allUsers) return <p>No data found!</p>;

  return (
    <div>
      <h1>Read Users</h1>
      <button onClick={handleButtonClick}>Get Users</button>
      {displayUsers && (
      <ul>
        {data.allUsers.map(({ user_id, name, email }) => (
          <li key={user_id}>
            {user_id} - {name} - {email}
          </li>
        ))}
      </ul>
      )}
      <h1>Create User</h1>
      <SignupForm />
      <h1>Update User</h1>
      <UpdateUser/>
      <h1>Delete User</h1>
      <DeleteUser/>
    </div>
  );
};

export default Users;
