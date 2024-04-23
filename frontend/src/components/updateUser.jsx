import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: Int!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      user_id
      name
      email
    }
  }
`;

function UpdateUser() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      alert('Please enter a valid user ID.');
      return;
    }
    await updateUser({ variables: { id: parseInt(userId, 10), name, email } });
    setUserId('');
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          id="userId"
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Update User</button>
    </form>
  );

  if (loading) return <p>Updating...</p>;
  if (error) return <p>Error occurred while updating: {error.message}</p>;
}

export default UpdateUser;
