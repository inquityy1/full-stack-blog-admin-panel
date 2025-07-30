'use client';

import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 5px 0 0;
  cursor: pointer;
`;

interface PostFormProps {
  title: string;
  content: string;
  editId: number | null;
  onTitleChange: (val: string) => void;
  onContentChange: (val: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function PostForm({
  title,
  content,
  editId,
  onTitleChange,
  onContentChange,
  onSubmit,
  onCancel,
}: PostFormProps) {
  return (
    <div>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <TextArea
        placeholder="Content"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <Button onClick={onSubmit}>{editId ? 'Update Post' : 'Add Post'}</Button>
      {editId && <Button onClick={onCancel}>Cancel</Button>}
    </div>
  );
}
