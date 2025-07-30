'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '@/lib/api';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
`;

export default function Dashboard() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const fetchPosts = async () => {
    const res = await API.get<Post[]>('/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (!title || !content) return;

    if (editId) {
      await API.put(`/posts/${editId}`, { title, content });
      setEditId(null);
    } else {
      await API.post('/posts', { title, content });
    }

    setTitle('');
    setContent('');
    fetchPosts();
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <PostForm
        title={title}
        content={content}
        editId={editId}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmit={handleCreateOrUpdate}
        onCancel={() => {
          setEditId(null);
          setTitle('');
          setContent('');
        }}
      />
      <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
}