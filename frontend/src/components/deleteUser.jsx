import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      user_id
      name
      email
    }
  }
`;

function DeleteUser() {
  const [user_id, setUserId] = useState('');
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER_MUTATION, {
    variables: { id: parseInt(user_id, 10) },
    onCompleted: () => setUserId('') // Clear input after deletion
  });

  if (loading) return <p>Deleting...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  const handleDelete = (event) => {
    event.preventDefault();
    if (!user_id) {
      alert('Please enter a valid user ID.');
      return;
    }
    deleteUser();
  };

  return (
    <form onSubmit={handleDelete}>
      <div>
        <label htmlFor="user_id">User ID:</label>
        <input
          id="user_id"
          type="number"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <button type="submit">Delete User</button>
    </form>
  );
}

export default DeleteUser;
