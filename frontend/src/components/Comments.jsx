import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_COMMENTS = gql`
  query getComments {
    comments {
      id
      content
      post {
        id
        title
      }
      user {
        id
        name
      }
    }
  }
`;

const Comments = () => {
  const { loading, error, data } = useQuery(GET_COMMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading comments!</p>;

  return (
    <div>
      <h1>Comments</h1>
      {data.comments.map(({ id, content, post, user }) => (
        <div key={id}>
          <p>{content}</p>
          <p>Comment on: {post.title} by {user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
