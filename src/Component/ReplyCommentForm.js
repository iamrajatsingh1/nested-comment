import React, { useState } from 'react';

const ReplyCommentForm = ({ onReplySave, onReplyCancel }) => {
    const [formState, setFormState] = useState(null);

    const handleOnChangeForm = (e) => {
        setFormState(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className='form-container'>
            <div className='form-base'>
                <label>Reply</label>
                <input name='name' placeholder='name' onChange={(e) => handleOnChangeForm(e)} />
                <textarea
                    name='comment'
                    placeholder={"Type your reply here..."}
                    onChange={(e) => handleOnChangeForm(e)}
                />
                <div className='form-base-actions'>
                    <button onClick={() => onReplySave(formState)}>Submit Reply</button>
                    <button onClick={onReplyCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ReplyCommentForm;
