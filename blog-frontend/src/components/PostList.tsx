'use client';

import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  margin: 5px;
  cursor: pointer;
`;

const PostCard = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
`;

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostList({ posts, onEdit, onDelete }: PostListProps) {
  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
          <br />
          <Button onClick={() => onEdit(post)}>Edit</Button>
          <Button onClick={() => onDelete(post.id)}>Delete</Button>
        </PostCard>
      ))}
    </div>
  );
}
