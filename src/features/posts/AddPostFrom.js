import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostFrom = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const displayAllUsers = users.map(user => (
    <option key={user.id} value={user.id}>{user.name}</option>
  ))

  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleContentChange = (e) => setContent(e.target.value)
  const handleUserChange = (e) => setUserId(e.target.value)

  const handlePostSave = () => {
    if (title && content) {
      dispatch(
        postAdded(title, content, userId))
    }
    setTitle('')
    setContent('')
    setUserId('')
  }

  const canSavePost = Boolean(title) && Boolean(content) && Boolean(userId);


  return (
    <section>
      <h2>Add New Post:</h2>
      <form>
        <label htmlFor='postTile'>Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <select id="postAuthor" value={userId} onChange={handleUserChange}>
          <option value=""></option>
          {displayAllUsers}
        </select>
        <label htmlFor='postContent'>Content</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={handleContentChange}
        />
      </form>
      <button type='button' onClick={handlePostSave} disabled={!canSavePost}>
        Save Post
      </button>
    </section >
  )
}

export default AddPostFrom