'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import API from '@/lib/api';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.access_token);
      router.push('/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Container>
  );
}
