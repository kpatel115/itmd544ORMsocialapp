// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/api';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts()
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.title}>{post.content}</li> // Adjust according to your user attributes
                ))}
            </ul>
        </div>
    );
};

export default Posts;
