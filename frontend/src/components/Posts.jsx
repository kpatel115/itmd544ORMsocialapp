import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      content
      user {
        id
        name
      }
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts!</p>;

  return (
    <div>
      <h1>Posts</h1>
      {data.posts.map(({ id, title, content, user }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{content}</p>
          <p>Posted by: {user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
