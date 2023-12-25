import React, { useState } from 'react';
import '../App.css';

export const AddCommentForm = ({ onAddComment }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || text.trim() === '') {
            alert('Name and comment text are required');
            return;
        }
        onAddComment({ name, text, timestamp: new Date() });
        setName('');
        setText('');
    };

    return (
        <form className='comment-form' onSubmit={handleSubmit}>
            <label>Comment</label>

            <input
                type="text"
                value={name}
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
            />

            <textarea
                value={text}
                placeholder='Comment'
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            <button type="submit">Post</button>
        </form>
    );
};