import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      user_id
      name
      email
    }
  }
`;

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUser({ variables: { name, email } });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}

export default SignupForm;
