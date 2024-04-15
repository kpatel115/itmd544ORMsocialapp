// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import { fetchComments } from '../api/api';

const Comments = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments()
            .then(response => setComments(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h1>Comments</h1>
            <ul>
                {comments.map(comment => (
                    <li key={comment.title}>{comment.content}</li> // Adjust according to your user attributes
                ))}
            </ul>
        </div>
    );
};

export default Comments;
