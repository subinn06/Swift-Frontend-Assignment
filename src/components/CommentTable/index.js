import React from 'react';
import './index.css';

const CommentTable = ({ comments, currentPage, pageSize }) => {
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedComments = comments.slice(startIndex, startIndex + pageSize);

  return (
    <table className="comment-table">
      <thead>
        <tr>
          <th>Post ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {paginatedComments.map((comment) => (
          <tr key={comment.id}>
            <td>{comment.postId}</td>
            <td>{comment.name}</td>
            <td>{comment.email}</td>
            <td>{comment.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CommentTable;
