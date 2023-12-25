import React from 'react';

const EditCommentForm = ({ onSubmit, onCancel, value, onChange }) => {
    return (
        <div className='form-base'>
            <textarea
                placeholder={"Edit your comment..."}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <div className='form-base-actions'>
                <button onClick={onSubmit}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditCommentForm;
